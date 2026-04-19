'use no memo';

import {
  CameraNoPermissions,
  CameraUnavailable,
  LayoutCamera,
} from '@/components/camera';
import { Icon } from '@/components/icons';
import { useIsFocused } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import {
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import { SkiaCamera } from 'react-native-vision-camera-skia';
import { useCSSVariable } from 'uniwind';

export default function Page() {
  const [foregroundDarker] = useCSSVariable(['--color-foreground-darker']);
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const isFocused = useIsFocused();

  if (device == null) return <CameraUnavailable />;
  if (!hasPermission) {
    requestPermission();
    return <CameraNoPermissions />;
  }

  return (
    <LayoutCamera>
      <View className="w-full flex-1 overflow-hidden rounded-3xl">
        <SkiaCamera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isFocused}
          onFrame={(frame, render) => {
            'worklet';
            render(({ frameTexture, canvas }) => {
              canvas.drawImage(frameTexture, 0, 0);
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
