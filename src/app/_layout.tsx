import { queryClient } from '@/api/_config';
import { posthog } from '@/libs/posthog';
import '@/global.css';
import { AnimatedSplashOverlay } from '@/layouts/animated-splash-overlay';
import { useLoaderGlobal } from '@/stores/loader-store';
import { QueryClientProvider } from '@tanstack/react-query';
import { Stack, useGlobalSearchParams, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { PostHogErrorBoundary, PostHogProvider } from 'posthog-react-native';
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
  const params = useGlobalSearchParams();
  const previous_pathname = React.useRef<string | undefined>(undefined);

  React.useEffect(() => {
    if (loading) stop();
  }, [pathname]);

  React.useEffect(() => {
    if (previous_pathname.current !== pathname) {
      posthog.screen(pathname, { ...params });
      previous_pathname.current = pathname;
    }
  }, [pathname, params]);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <SafeAreaListener onChange={({ insets }) => Uniwind.updateInsets(insets)}>
        <GestureHandlerRootView>
          <QueryClientProvider client={queryClient}>
            <PostHogProvider
              client={posthog}
              autocapture={{
                captureScreens: false,
                captureTouches: true,
                propsToCapture: ['testID'],
                maxElementsCaptured: 20,
              }}
            >
              <PostHogErrorBoundary>
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
              </PostHogErrorBoundary>
            </PostHogProvider>
          </QueryClientProvider>
          <AnimatedSplashOverlay />
        </GestureHandlerRootView>
      </SafeAreaListener>
    </SafeAreaProvider>
  );
}
