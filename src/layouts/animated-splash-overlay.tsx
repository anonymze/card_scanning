import { Image } from 'expo-image';
import React from 'react';
import Animated, { Easing, Keyframe } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { withUniwind } from 'uniwind';

const StyledImage = withUniwind(Image);

const DURATION = 5000;

export function AnimatedSplashOverlay() {
  const [visible, setVisible] = React.useState(true);

  if (!visible) return null;

  return (
    <Animated.View
      entering={splashKeyframe.duration(DURATION).withCallback((finished) => {
        'worklet';
        if (finished) {
          scheduleOnRN(setVisible, false);
        }
      })}
      className="absolute inset-0 z-99 items-center justify-center bg-background-primary-darker"
    >
      <StyledImage
        source={require('../../resources/splash.png')}
        className="h-50 w-50"
        contentFit="contain"
      />
    </Animated.View>
  );
}

export function AnimatedIcon() {
  return null;
}

const splashKeyframe = new Keyframe({
  0: {
    transform: [{ scale: 1 }],
    opacity: 1,
  },
  // hold still
  30: {
    transform: [{ scale: 1 }],
    opacity: 1,
    easing: Easing.bezier(0.25, 0.1, 0.5, 1),
  },
  // zoom starts + opacity drops immediately
  31: {
    opacity: 0.95,
    easing: Easing.bezier(0.25, 0.1, 0.5, 1),
  },
  100: {
    transform: [{ scale: 8 }],
    opacity: 0,
  },
});
