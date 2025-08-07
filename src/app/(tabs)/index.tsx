import {
  CameraNoPermissions,
  CameraUnavailable,
  LayoutCamera,
} from '@/components/camera';
import { ScanIcon } from '@/components/icons';
import { ButtonPrimary } from '@/components/ui/buttons';
import { useLoaderGlobal } from '@/lib/loader-store';
import React from 'react';
import { Text, View } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import config from 'tailwind.config';

export default function Page() {
  const { start, stop, loading } = useLoaderGlobal()
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
            borderRadius: 30,
          }}
          device={device}
          isActive={loading}
        />
        <ButtonPrimary action={() => {
          if (loading) return stop();
          start();
        }} title="Scanner" icon={<ScanIcon color={config.theme.extend.colors.foreground} />} className='mt-auto rounded-none' />
      </View>
    </LayoutCamera>
  );
}
