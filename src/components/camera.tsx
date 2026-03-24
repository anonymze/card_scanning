import * as Linking from 'expo-linking';
import { View } from 'react-native';
import { useCSSVariable } from 'uniwind';
import { CameraOffIcon, PlusIcon } from './icons';
import { ButtonPrimary } from './ui/buttons';
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
  const [gray, fg] = useCSSVariable(['--color-gray', '--color-foreground']);

  return (
    <LayoutCamera>
      <CameraOffIcon width={90} height={90} color={String(gray)} />
      <View className="max-w-72 gap-10">
        <Text className="text-gray max-w-72 text-center">
          Vous n'avez pas autorisé la permission de la caméra
        </Text>
        <ButtonPrimary
          title="Activer la permission"
          icon={<PlusIcon color={String(fg)} />}
          action={() => {
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
      <CameraOffIcon width={70} height={70} color={String(gray)} />
      <Text className="text-gray max-w-72 text-center">
        Vous semblez ne pas avoir de caméra sur votre appareil
      </Text>
    </LayoutCamera>
  );
};

export { CameraNoPermissions, CameraUnavailable, LayoutCamera };
