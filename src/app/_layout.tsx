import { queryClient } from '@/api/_config';
import { dbVersionQueryOptions } from '@/api/queries/db-queries';
import { logDbStats } from '@/libs/db';
import { ensureDbDownloaded } from '@/libs/db-download';
import { posthog } from '@/libs/posthog';
import '@/global.css';
import { AnimatedSplashOverlay } from '@/layouts/animated-splash-overlay';
import { useLoaderGlobal } from '@/stores/loader-store';
import { QueryClientProvider, useQuery } from '@tanstack/react-query';
import { initExecutorch } from 'react-native-executorch';
import { ExpoResourceFetcher } from 'react-native-executorch-expo-resource-fetcher';

initExecutorch({ resourceFetcher: ExpoResourceFetcher });
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

function SplashGate() {
  const versionQuery = useQuery(dbVersionQueryOptions());
  const [dbReady, setDbReady] = React.useState(false);
  const [dbError, setDbError] = React.useState<string | undefined>();

  React.useEffect(() => {
    if (!versionQuery.data) return;
    setDbError(undefined);
    ensureDbDownloaded(versionQuery.data)
      .then(() => {
        logDbStats();
        setDbReady(true);
      })
      .catch((e) =>
        setDbError(e instanceof Error ? e.message : 'Download failed'),
      );
  }, [versionQuery.data]);

  const error = versionQuery.isError
    ? (versionQuery.error?.message ?? 'Network unreachable')
    : dbError;

  return (
    <AnimatedSplashOverlay
      ready={dbReady}
      error={error}
      onRetry={() => {
        setDbError(undefined);
        if (versionQuery.isError) versionQuery.refetch();
        else if (versionQuery.data) {
          ensureDbDownloaded(versionQuery.data)
            .then(() => setDbReady(true))
            .catch((e) =>
              setDbError(e instanceof Error ? e.message : 'Download failed'),
            );
        }
      }}
    />
  );
}

export default function RootLayout() {
  const { stop, loading } = useLoaderGlobal();
  const pathname = usePathname();
  const params = useGlobalSearchParams();
  const previousPathname = React.useRef<string | undefined>(undefined);

  React.useEffect(() => {
    if (loading) stop();
  }, [pathname]);

  React.useEffect(() => {
    if (previousPathname.current !== pathname) {
      // posthog.screen(pathname, { ...params });
      previousPathname.current = pathname;
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
                    <Stack screenOptions={{ headerShown: false, animation: 'none' }}>
                      <Stack.Screen name="(tabs)" />
                    </Stack>
                  </KeyboardProvider>
                </PressablesConfig>
              </PostHogErrorBoundary>
            </PostHogProvider>
            <SplashGate />
          </QueryClientProvider>
        </GestureHandlerRootView>
      </SafeAreaListener>
    </SafeAreaProvider>
  );
}
