import '@/styles/global.css';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';

// export const unstable_settings = {
//   initialRouteName: '(app)',
// };

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <KeyboardProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}
