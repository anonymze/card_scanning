import * as Linking from 'expo-linking';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import config from 'tailwind.config';
import { CameraOffIcon, PlusIcon } from './icons';
import { ButtonPrimary } from './ui/buttons';

const LayoutCamera = ({ children }: { children: React.ReactNode }) => {
  return (
    <View className="flex-1">
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={[
          config.theme.extend.colors.background.primaryDark,
          config.theme.extend.colors.background.primaryLight,
        ]}
        style={StyleSheet.absoluteFill}
      />
      <View className="p-safe flex-1">
        <View className="m-4 flex-1 items-center justify-center gap-4 rounded-3xl border border-dashed border-foreground">
          {children}
        </View>
      </View>
    </View>
  );
};

const CameraNoPermissions = () => {
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
            Linking.openURL('app-settings:');
          }}
        />
      </View>
    </LayoutCamera>
  );
};

const CameraUnavailable = () => {
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

export { CameraNoPermissions, CameraUnavailable, LayoutCamera };
