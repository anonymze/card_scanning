import { Text, View } from 'react-native';
import config from 'tailwind.config';
import { CameraOffIcon, PlusIcon } from './icons';
import { ButtonPrimary } from './ui/buttons';
import * as Linking from 'expo-linking';

const LayoutCamera = ({ children }: { children: React.ReactNode }) => {
  return (
    <View className="flex-1 items-center justify-center gap-5 bg-background-primary">
      {children}
    </View>
  );
};

const NoPermissionsCamera = () => {
  return (
    <LayoutCamera>
      <CameraOffIcon
        width={90}
        height={90}
        color={config.theme.extend.colors.gray}
      />
      <View className="w-4/5 gap-10">
        <Text className="text-center text-lg text-white">
          Vous n'avez pas autorisé la permission de la caméra.
        </Text>
        <ButtonPrimary
          title="Activer la permission"
          icon={<PlusIcon color={config.theme.extend.colors.foreground} />}
          action={() => {
            Linking.openSettings();
          }}
        />
      </View>
    </LayoutCamera>
  );
};

const NoCamera = () => {
  return (
    <LayoutCamera>
      <CameraOffIcon
        width={90}
        height={90}
        color={config.theme.extend.colors.gray}
      />
      <Text className="w-4/5 text-center text-lg text-white">
        Vous semblez ne pas avoir de caméra sur votre appareil.
      </Text>
    </LayoutCamera>
  );
};

export { LayoutCamera, NoCamera, NoPermissionsCamera };
