import { useLoaderGlobal } from '@/lib/loader-store';
import '@/styles/global.css';
import { useKeepAwake } from 'expo-keep-awake';
import { Stack, usePathname } from 'expo-router';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const { stop, loading } = useLoaderGlobal();
  const pathname = usePathname();
  useKeepAwake();

  // stop loader when we navigate
  React.useEffect(() => {
    if (loading) stop();
  }, [pathname]);

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
