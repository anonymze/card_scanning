import {
  CameraNoPermissions,
  CameraUnavailable,
  LayoutCamera,
} from '@/components/camera';
import { DecksIcon, ScanIcon } from '@/components/icons';
import { ButtonPrimary } from '@/components/ui/buttons';
import { useLoaderGlobal } from '@/lib/loader-store';
import { Text, View } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import config from 'tailwind.config';

export default function Page() {
  const { start, stop, loading } = useLoaderGlobal();
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();

  if (!hasPermission) {
    requestPermission();
    return <CameraNoPermissions />;
  }
  if (device == null) return <CameraUnavailable />;

  return (
    <LayoutCamera>
      <View className="w-full flex-1 overflow-hidden rounded-3xl">
        <Camera
          style={{
            position: 'absolute',
            inset: 0,
          }}
          device={device}
          isActive={loading}
        />
        <View className="items-center pl-5 pt-5 flex-row gap-1">
          <DecksIcon
            className="left-10 top-20 mx-20"
            color={config.theme.extend.colors.foregroundDark}
          />
          <Text className='font-bold text-foregroundDark'>0</Text>
        </View>
        <ButtonPrimary
          action={() => {
            // if (loading) return stop();
            // start();
          }}
          title="Scanner"
          icon={<ScanIcon color={config.theme.extend.colors.foreground} />}
          className="mt-auto rounded-none"
        />
      </View>
    </LayoutCamera>
  );
}
