import Constants from 'expo-constants';
import PostHog from 'posthog-react-native';

const apiKey = Constants.expoConfig?.extra?.posthogProjectToken as
  | string
  | undefined;
const host =
  (Constants.expoConfig?.extra?.posthogHost as string) ||
  'https://us.i.posthog.com';
const isConfigured = Boolean(
  apiKey && apiKey !== 'phc_your_project_token_here',
);

if (!isConfigured) {
  console.warn(
    'PostHog project token not configured. Analytics disabled. Set POSTHOG_PROJECT_TOKEN in .env.',
  );
}

export const posthog = new PostHog(apiKey || 'placeholder_key', {
  host,
  disabled: !isConfigured,
  captureAppLifecycleEvents: true,
  flushAt: 20,
  flushInterval: 10000,
  maxBatchSize: 100,
  maxQueueSize: 1000,
  preloadFeatureFlags: true,
  sendFeatureFlagEvent: true,
  featureFlagsRequestTimeoutMs: 10000,
  requestTimeout: 10000,
  fetchRetryCount: 3,
  fetchRetryDelay: 3000,
});
