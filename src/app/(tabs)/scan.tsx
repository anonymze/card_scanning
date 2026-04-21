'use no memo';

import {
  CameraNoPermissions,
  CameraUnavailable,
  LayoutCamera,
} from '@/components/camera';
import { Icon } from '@/components/icons';
import { Skia } from '@shopify/react-native-skia';
import { useIsFocused } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ScalarType, useExecutorchModule } from 'react-native-executorch';
import { useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { SkiaCamera, type SkiaCameraRef } from 'react-native-vision-camera-skia';
import { useCSSVariable } from 'uniwind';
import { useSharedValue } from 'react-native-reanimated';

const SIZE = 640;
const ANCHORS = 8400;
const CONF = 0.88;

export default function Page() {
  const [foregroundDarker] = useCSSVariable(['--color-foreground-darker']);
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const isFocused = useIsFocused();
  const cameraRef = React.useRef<SkiaCameraRef>(null);
  const detections = useSharedValue<number[][]>([]);

  const mtg = useExecutorchModule({
    modelSource: require('@/assets/models/mtg_640.pte'),
  });

  React.useEffect(() => {
    if (!mtg.isReady || !isFocused) return;
    const id = setInterval(async () => {
      const input = grabFrame(cameraRef.current);
      if (!input) return;
      const out = await mtg.forward([
        { dataPtr: input, sizes: [1, 3, SIZE, SIZE], scalarType: ScalarType.FLOAT },
      ]);
      detections.value = parseDetections(new Float32Array(out[0].dataPtr));
    }, 1000);
    return () => clearInterval(id);
  }, [mtg.isReady, isFocused]);

  if (device == null) return <CameraUnavailable />;
  if (!hasPermission) {
    requestPermission();
    return <CameraNoPermissions />;
  }

  return (
    <LayoutCamera>
      <View className="w-full flex-1 overflow-hidden rounded-3xl">
        <SkiaCamera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isFocused}
          onFrame={(frame, render) => {
            'worklet';
            render(({ frameTexture, canvas }) => {
              canvas.drawImage(frameTexture, 0, 0);
              const fw = frameTexture.width();
              const fh = frameTexture.height();
              const angle = (Date.now() / 100) % 360;
              const glowLayers = [
                { w: 48, a: 0.06 },
                { w: 32, a: 0.12 },
                { w: 18, a: 0.22 },
              ];
              for (const [cx, cy, bw, bh] of detections.value) {
                const x = (cy * fw) / SIZE;
                const y = fh - (cx * fh) / SIZE;
                const w = (bh * fw) / SIZE;
                const h = (bw * fh) / SIZE;
                const rect = { x: x - w / 2, y: y - h / 2, width: w, height: h };
                const rrect = { rect, rx: 14, ry: 14 };
                const mat = Skia.Matrix();
                mat.postRotate(angle, x, y);
                const shader = Skia.Shader.MakeSweepGradient(
                  x, y,
                  [
                    Skia.Color('#c084fc'),
                    Skia.Color('#22d3ee'),
                    Skia.Color('#c084fc'),
                  ],
                  null,
                  0,
                  mat,
                );
                for (const g of glowLayers) {
                  const p = Skia.Paint();
                  p.setStyle(1);
                  p.setAntiAlias(true);
                  p.setStrokeWidth(g.w);
                  p.setShader(shader);
                  p.setAlphaf(g.a);
                  canvas.drawRRect(rrect, p);
                }
                const line = Skia.Paint();
                line.setStyle(1);
                line.setAntiAlias(true);
                line.setStrokeWidth(6);
                line.setShader(shader);
                canvas.drawRRect(rrect, line);
              }
            });
            frame.dispose();
          }}
        />
        <View className="flex-row items-center gap-1 pt-3.5 pl-3.5">
          <Icon name="decks" size={20} color={String(foregroundDarker)} />
          <Text className="font-sans-bold text-foreground-darker">3</Text>
        </View>
      </View>
    </LayoutCamera>
  );
}

function grabFrame(ref: SkiaCameraRef | null) {
  let snap;
  try { snap = ref?.takeSnapshot(); } catch { return null; }
  if (!snap) return null;
  const surface = Skia.Surface.MakeOffscreen(SIZE, SIZE);
  if (!surface) return null;
  surface.getCanvas().drawImageRect(
    snap,
    { x: 0, y: 0, width: snap.width(), height: snap.height() },
    { x: 0, y: 0, width: SIZE, height: SIZE },
    Skia.Paint(),
  );
  const rgba = surface.makeImageSnapshot().readPixels(0, 0);
  if (!rgba) return null;
  const P = SIZE * SIZE;
  const input = new Float32Array(3 * P);
  for (let i = 0; i < P; i++) {
    input[i] = rgba[i * 4] / 255;
    input[P + i] = rgba[i * 4 + 1] / 255;
    input[2 * P + i] = rgba[i * 4 + 2] / 255;
  }
  return input;
}

function parseDetections(d: Float32Array) {
  const all: number[][] = [];
  for (let i = 0; i < ANCHORS; i++) {
    const conf = d[4 * ANCHORS + i];
    if (conf > CONF)
      all.push([d[i], d[ANCHORS + i], d[2 * ANCHORS + i], d[3 * ANCHORS + i], conf]);
  }
  all.sort((a, b) => b[4] - a[4]);
  const kept: number[][] = [];
  for (const a of all) {
    if (!kept.some((k) => Math.abs(a[0] - k[0]) < a[2] / 2 && Math.abs(a[1] - k[1]) < a[3] / 2))
      kept.push(a);
  }
  return kept;
}
