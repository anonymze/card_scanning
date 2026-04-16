import {
  CameraNoPermissions,
  CameraUnavailable,
  LayoutCamera,
} from '@/components/camera';
import { DecksIcon } from '@/components/icons';
import { usePostHog } from 'posthog-react-native';
import { Text, View } from 'react-native';
import {
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import { SkiaCamera } from 'react-native-vision-camera-skia';
import { useCSSVariable } from 'uniwind';

export default function Page() {
  const [foregroundDarker] = useCSSVariable(['--color-foreground-darker']);
  // const { start, stop } = useLoaderGlobal();
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const posthog = usePostHog();

  // React.useEffect(() => {
  //   posthog.capture('scan_screen_viewed');
  // }, [posthog]);

  // React.useEffect(
  //   React.useCallback(() => {
  //     if (device && hasPermission) start();
  //     return () => stop();
  //   }, [device, hasPermission]),
  // );

  if (device == null) return <CameraUnavailable />;
  if (!hasPermission) {
    posthog.capture('camera_permission_requested');
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
            'worklet';
            render(({ canvas, frameTexture }) => {
              canvas.drawImage(frameTexture, 0, 0);
            });
            frame.dispose();
          }}
        />
        <View className="flex-row items-center gap-1 pt-5 pl-5">
          <DecksIcon
            className="top-20 left-10 mx-20"
            color={foregroundDarker}
          />
          <Text className="font-sans-bold text-foreground-darker">0</Text>
        </View>
      </View>
    </LayoutCamera>
  );
}
