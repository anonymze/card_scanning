import { Image } from 'expo-image';
import React from 'react';
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

export function AnimatedSplashOverlay() {
  const [visible, setVisible] = React.useState(true);
  const zoomProgress = useSharedValue(0);
  const bgOpacity = useSharedValue(1);

  const imageStyle = useAnimatedStyle(() => {
    // exponential zoom: perceptually uniform speed
    const scale = Math.pow(MAX_SCALE, zoomProgress.value);
    const translateY = zoomProgress.value * 10;
    return { transform: [{ scale }, { translateY }] };
  });

  const bgStyle = useAnimatedStyle(() => ({ opacity: bgOpacity.value }));

  React.useEffect(() => {
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
  }, []);

  if (!visible) return null;

  return (
    <>
      <Animated.View
        style={[{ backgroundColor: '#08091A' }, bgStyle]}
        className="absolute inset-0 z-99"
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
    </>
  );
}

export function AnimatedIcon() {
  return null;
}
