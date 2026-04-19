import * as Linking from 'expo-linking';
import { View } from 'react-native';
import { useCSSVariable } from 'uniwind';
import { Icon } from './icons';
import { Button } from './ui/buttons';
import { Text } from './ui/texts';

const LayoutCamera = ({ children }: { children: React.ReactNode }) => {
  const [bgDarker, bgLighter] = useCSSVariable([
    '--color-background-primary-darker',
    '--color-background-primary-lighter',
  ]);

  return (
    <View
      className="flex-1"
      style={{
        experimental_backgroundImage: `linear-gradient(135deg, ${bgDarker}, ${bgLighter})`,
      }}
    >
      <View className="p-safe flex-1">
        <View className="border-foreground m-4 flex-1 items-center justify-center gap-4 rounded-3xl border border-dashed">
          {children}
        </View>
      </View>
    </View>
  );
};

const CameraNoPermissions = () => {
  const [gray] = useCSSVariable([
    '--color-gray',
    '--color-foreground',
  ]);

  return (
    <LayoutCamera>
      <Icon name="camera-off" size={90} color={String(gray)} />
      <View className="max-w-72 gap-10">
        <Text className="text-gray max-w-72 text-center">
          Vous n'avez pas autorisé la permission de la caméra
        </Text>
        <Button
          title="Activer la permission"
          // icon={<PlusIcon color={String(foreground)} />}
          onPress={() => {
            Linking.openURL('app-settings:');
          }}
        />
      </View>
    </LayoutCamera>
  );
};

const CameraUnavailable = () => {
  const gray = useCSSVariable('--color-gray');

  return (
    <LayoutCamera>
      <Icon name="camera-off" size={70} color={String(gray)} />
      <Text className="text-gray max-w-60 text-center">
        Vous semblez ne pas avoir de caméra sur votre appareil
      </Text>
    </LayoutCamera>
  );
};

export { CameraNoPermissions, CameraUnavailable, LayoutCamera };
