import { queryClient } from '@/api/_config';
import '@/global.css';
import { AnimatedSplashOverlay } from '@/layouts/animated-splash-overlay';
import { useLoaderGlobal } from '@/stores/loader-store';
import { QueryClientProvider } from '@tanstack/react-query';
import { Stack, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { PressablesConfig } from 'pressto';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import {
  initialWindowMetrics,
  SafeAreaListener,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { Uniwind } from 'uniwind';

/** CONFIGS */
SplashScreen.setOptions({
  fade: false,
});

export default function RootLayout() {
  const { stop, loading } = useLoaderGlobal();
  const pathname = usePathname();

  React.useEffect(() => {
    if (loading) stop();
  }, [pathname]);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <SafeAreaListener onChange={({ insets }) => Uniwind.updateInsets(insets)}>
        <GestureHandlerRootView>
          <QueryClientProvider client={queryClient}>
            <PressablesConfig
              animationType="timing"
              animationConfig={{ duration: 100 }}
            >
              <KeyboardProvider>
                <Stack>
                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                  />
                </Stack>
              </KeyboardProvider>
            </PressablesConfig>
          </QueryClientProvider>
          <AnimatedSplashOverlay />
        </GestureHandlerRootView>
      </SafeAreaListener>
    </SafeAreaProvider>
  );
}
