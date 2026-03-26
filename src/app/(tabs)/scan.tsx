import {
  CameraNoPermissions,
  CameraUnavailable,
  LayoutCamera,
} from '@/components/camera';
import { DecksIcon, ScanIcon } from '@/components/icons';
import { ButtonPrimary } from '@/components/ui/buttons';
import { useLoaderGlobal } from '@/stores/loader-store';
import { Text, View } from 'react-native';
import { useCSSVariable } from 'uniwind';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useFrameProcessor,
} from 'react-native-vision-camera';

export default function Page() {
  const [foregroundDarker, foreground] = useCSSVariable(['--color-foreground-darker', '--color-foreground']);
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
            color={foregroundDarker}
          />Next up.
          <Text className="font-bold text-foreground-dark">0</Text>
        </View>
        <ButtonPrimary
          action={() => {
            if (loading) return stop();
            start();
          }}
          title={loading ? 'Arrêter' : 'Scanner'}
          icon={
            <ScanIcon color={foreground} />
          }
          className="mt-auto rounded-none"
        />
      </View>
    </LayoutCamera>
  );
}
