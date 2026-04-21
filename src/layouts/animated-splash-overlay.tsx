import { Image } from 'expo-image';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { withUniwind } from 'uniwind';

const StyledImage = withUniwind(Image);

const DURATION = 800;
const HOLD = DURATION * 0.2;
const ZOOM_DURATION = DURATION * 0.8;
const MAX_SCALE = 125;

export function AnimatedSplashOverlay({
  progress,
  statusLabel,
  ready = true,
  error,
  onRetry,
}: {
  progress?: number;
  statusLabel?: string;
  ready?: boolean;
  error?: string;
  onRetry?: () => void;
} = {}) {
  const [visible, setVisible] = React.useState(true);
  const zoomProgress = useSharedValue(0);
  const bgOpacity = useSharedValue(1);
  const cardOpacity = useSharedValue(0);

  const imageStyle = useAnimatedStyle(() => {
    const scale = Math.pow(MAX_SCALE, zoomProgress.value);
    const translateY = zoomProgress.value * 10;
    return { transform: [{ scale }, { translateY }] };
  });

  const bgStyle = useAnimatedStyle(() => ({ opacity: bgOpacity.value }));
  const cardStyle = useAnimatedStyle(() => ({ opacity: cardOpacity.value }));

  const showCard = (progress !== undefined && !ready) || error !== undefined;

  React.useEffect(() => {
    cardOpacity.value = withTiming(showCard ? 1 : 0, {
      duration: showCard ? 300 : 200,
    });
  }, [showCard]);

  React.useEffect(() => {
    if (!ready || error) return;
    zoomProgress.value = withDelay(
      HOLD,
      withTiming(
        1,
        { duration: ZOOM_DURATION, easing: Easing.linear },
        (finished) => {
          'worklet';
          if (finished) scheduleOnRN(setVisible, false);
        },
      ),
    );
    bgOpacity.value = withDelay(
      HOLD + ZOOM_DURATION * 0.35,
      withTiming(0, { duration: ZOOM_DURATION * 0.5, easing: Easing.linear }),
    );
  }, [ready, error]);

  if (!visible) return null;

  const clamped = Math.max(0, Math.min(1, progress ?? 0));

  return (
    <>
      <Animated.View
        style={bgStyle}
        className="bg-background-primary-darker absolute inset-0 z-99"
      />
      <Animated.View
        style={imageStyle}
        className="absolute inset-0 z-99 items-center justify-center"
      >
        <StyledImage
          source={require('../../resources/splash.png')}
          className="h-50 w-50"
          contentFit="contain"
        />
      </Animated.View>
      {showCard && (
        <Animated.View
          style={cardStyle}
          className="absolute inset-x-0 top-1/2 z-99 mt-48 items-center px-10"
        >
          <View className="border-foreground-darker bg-background-primary w-full max-w-xs gap-3 rounded-xl border p-4">
            {error ? (
              <>
                <Text className="text-card-deck-lighter text-[10px] tracking-[3px] uppercase">
                  Connection failed
                </Text>
                <Text className="text-gray-darker text-xs" numberOfLines={2}>
                  {error}
                </Text>
                {onRetry && (
                  <Pressable
                    onPress={onRetry}
                    className="bg-foreground active:bg-foreground-darker mt-1 self-end rounded-lg px-4 py-2"
                  >
                    <Text className="text-background-primary-darker font-sans-semibold text-xs">
                      Retry
                    </Text>
                  </Pressable>
                )}
              </>
            ) : (
              <>
                <Text className="text-gray text-[10px] tracking-[3px] uppercase">
                  {statusLabel ?? 'Loading'}
                </Text>
                <View className="bg-background-primary-lighter h-1 w-full overflow-hidden rounded-full">
                  <View
                    className="bg-foreground h-full"
                    style={{ width: `${clamped * 100}%` }}
                  />
                </View>
              </>
            )}
          </View>
        </Animated.View>
      )}
    </>
  );
}

export function AnimatedIcon() {
  return null;
}
