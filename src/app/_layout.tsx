import { Slot } from 'expo-router';
import 'global.css';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const unstable_settings = {
  initialRouteName: '(app)',
};

export default function RootLayout() {
  return (
        <GestureHandlerRootView>
            <Slot />
        </GestureHandlerRootView>
  );
}
