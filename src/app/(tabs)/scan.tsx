import {
  CameraNoPermissions,
  CameraUnavailable,
  LayoutCamera,
} from '@/components/camera';
import { DecksIcon } from '@/components/icons';
import { Text, View } from 'react-native';
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

  if (device == null) return <CameraUnavailable />;
  if (!hasPermission) {
    requestPermission();
    return <CameraNoPermissions />;
  }

  return (
    <LayoutCamera>
      <View className="w-full flex-1 overflow-hidden rounded-3xl">
        <SkiaCamera
          device={device}
          isActive={true}
          onFrame={(frame, render) => {
            // 'worklet';
            // // ... custom Frame processing logic
            // render(({ frameTexture, canvas }) => {
            //   // ... custom drawing operations
            //   canvas.drawImage(frameTexture, 0, 0);
            // });
            // frame.dispose();
          }}
        />
        <View className="flex-row items-center gap-1 pt-safe px-safe">
          <DecksIcon
            className="top-20 left-10 mx-20"
            color={foregroundDarker}
          />
          <Text className="font-sans-bold text-foreground-darker">
            Step 3: skia camera
          </Text>
        </View>
      </View>
    </LayoutCamera>
  );
}
