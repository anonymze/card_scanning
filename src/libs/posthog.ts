import Constants from 'expo-constants';
import PostHog from 'posthog-react-native';

const api_key = Constants.expoConfig?.extra?.posthogProjectToken as
  | string
  | undefined;
const host =
  (Constants.expoConfig?.extra?.posthogHost as string) ||
  'https://us.i.posthog.com';
const is_configured = Boolean(
  api_key && api_key !== 'phc_your_project_token_here',
);

if (!is_configured) {
  console.warn(
    'PostHog project token not configured. Analytics disabled. Set POSTHOG_PROJECT_TOKEN in .env.',
  );
}

export const posthog = new PostHog(api_key || 'placeholder_key', {
  host,
  disabled: !is_configured,
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
