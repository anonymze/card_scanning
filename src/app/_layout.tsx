import '@/global.css';
import { useLoaderGlobal } from '@/lib/loader-store';
import { Stack, usePathname } from 'expo-router';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Uniwind } from 'uniwind';

// Force dark theme — app is dark-only
// Uniwind.setTheme('dark');

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const { stop, loading } = useLoaderGlobal();
  const pathname = usePathname();
  // useKeepAwake();

  React.useEffect(() => {
    if (loading) stop();
  }, [pathname]);

  return (
    <SafeAreaProvider>
      <InsetUpdater />
      <GestureHandlerRootView>
        <KeyboardProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </KeyboardProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

function InsetUpdater() {
  const insets = useSafeAreaInsets();
  React.useLayoutEffect(() => {
    Uniwind.updateInsets(insets);
  }, [insets]);
  return null;
}
