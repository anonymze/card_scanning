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
// import { useTensorflowModel } from 'react-native-fast-tflite';
import { ScalarType, useExecutorchModule } from 'react-native-executorch';
import {
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import { SkiaCamera, type SkiaCameraRef } from 'react-native-vision-camera-skia';
import { useCSSVariable } from 'uniwind';
import { useSharedValue } from 'react-native-reanimated';
// import { useResizePlugin } from 'vision-camera-resize-plugin';

export default function Page() {
  const [foregroundDarker] = useCSSVariable(['--color-foreground-darker']);
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const isFocused = useIsFocused();
  const cameraRef = React.useRef<SkiaCameraRef>(null);
  const detectionsSV = useSharedValue<number[][]>([]);
  const snapDims = useSharedValue({ w: 720, h: 1280 });
  // const { resize } = useResizePlugin();

  const mtgModel = useExecutorchModule({
    modelSource: require('@/assets/models/mtg_640.pte'),
  });

  React.useEffect(() => {
    if (!mtgModel.isReady || !isFocused) return;
    const id = setInterval(() => {
      let snap;
      try {
        snap = cameraRef.current?.takeSnapshot();
      } catch {
        return;
      }
      if (!snap) return;
      snapDims.value = { w: snap.width(), h: snap.height() };
      const surface = Skia.Surface.MakeOffscreen(640, 640);
      if (!surface) return;
      surface.getCanvas().drawImageRect(
        snap,
        { x: 0, y: 0, width: snap.width(), height: snap.height() },
        { x: 0, y: 0, width: 640, height: 640 },
        Skia.Paint(),
      );
      const rgba = surface.makeImageSnapshot().readPixels(0, 0);
      if (!rgba) return;
      const P = 640 * 640;
      const input = new Float32Array(3 * P);
      for (let i = 0; i < P; i++) {
        input[i] = rgba[i * 4] / 255;
        input[P + i] = rgba[i * 4 + 1] / 255;
        input[2 * P + i] = rgba[i * 4 + 2] / 255;
      }
      mtgModel
        .forward([{ dataPtr: input, sizes: [1, 3, 640, 640], scalarType: ScalarType.FLOAT }])
        .then((out) => {
          const d = new Float32Array(out[0].dataPtr);
          const N = 8400;
          const all: number[][] = [];
          for (let i = 0; i < N; i++) {
            if (d[4 * N + i] > 0.85)
              all.push([d[i], d[N + i], d[2 * N + i], d[3 * N + i], d[4 * N + i], d[5 * N + i]]);
          }
          all.sort((a, b) => b[4] - a[4]);
          const kept: number[][] = [];
          for (const a of all) {
            if (!kept.some((k) => Math.abs(a[0] - k[0]) < a[2] / 2 && Math.abs(a[1] - k[1]) < a[3] / 2))
              kept.push(a);
          }
          detectionsSV.value = kept;
          console.log('[nms]', kept.length, '/', all.length);
        })
        .catch((e) => console.log('[forward] err:', e));
    }, 1000);
    return () => clearInterval(id);
  }, [mtgModel.isReady, isFocused]);

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
              const paint = Skia.Paint();
              paint.setStyle(1);
              paint.setColor(Skia.Color('yellow'));
              paint.setStrokeWidth(6);
              for (const d of detectionsSV.value) {
                const x = (d[1] * fw) / 640;
                const y = fh - (d[0] * fh) / 640;
                const w = (d[3] * fw) / 640;
                const h = (d[2] * fh) / 640;
                canvas.drawRect({ x: x - w / 2, y: y - h / 2, width: w, height: h }, paint);
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
