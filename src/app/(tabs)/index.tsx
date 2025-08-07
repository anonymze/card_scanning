import { CameraNoPermissions, CameraUnavailable } from '@/components/camera';
import { StyleSheet } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

export default function Page() {
  const device = useCameraDevice('front');
  const { hasPermission } = useCameraPermission();

  if (!hasPermission) return <CameraNoPermissions />;
  if (device == null) return  <CameraUnavailable />;

  return (
    <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
  );
}
