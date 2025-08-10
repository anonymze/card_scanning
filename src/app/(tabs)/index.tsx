import {
  CameraNoPermissions,
  CameraUnavailable,
  LayoutCamera,
} from '@/components/camera';
import { DecksIcon, ScanIcon } from '@/components/icons';
import { ButtonPrimary } from '@/components/ui/buttons';
import { useLoaderGlobal } from '@/lib/loader-store';
import { themeRuntimeValues, useTheme } from '@/styles/theme';
import { Text, View } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useFrameProcessor,
} from 'react-native-vision-camera';

export default function Page() {
  const { theme } = useTheme();
  const { start, stop, loading } = useLoaderGlobal();
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();

  const frameProcessor = useFrameProcessor(
    (frame) => {
      'worklet';
      if (loading) {
        // Process frame for card detection here
        console.log(`Processing frame ${frame.width}x${frame.height}`);
      }
    },
    [loading],
  );

  if (device == null) return <CameraUnavailable />;
  if (!hasPermission) {
    requestPermission();
    return <CameraNoPermissions />;
  }

  return (
    <LayoutCamera>
      <View className="w-full flex-1 overflow-hidden rounded-3xl">
        <Camera
          style={{
            position: 'absolute',
            inset: 0,
          }}
          device={device}
          isActive={true}
          frameProcessor={loading ? frameProcessor : undefined}
        />
        <View className="flex-row items-center gap-1 pl-5 pt-5">
          <DecksIcon
            className="left-10 top-20 mx-20"
            color={themeRuntimeValues[theme].foreground.darker}
          />
          <Text className="font-bold text-foreground-dark">0</Text>
        </View>
        <ButtonPrimary
          action={() => {
            if (loading) return stop();
            start();
          }}
          title={loading ? 'Arrêter' : 'Scanner'}
          icon={
            <ScanIcon color={themeRuntimeValues[theme].foreground.DEFAULT} />
          }
          className="mt-auto rounded-none"
        />
      </View>
    </LayoutCamera>
  );
}
