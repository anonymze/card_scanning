import React from 'react';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  focused: boolean;
  children: React.ReactNode;
};

export const AnimatedTabIcon = ({ focused, children }: Props) => {
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  React.useEffect(() => {
    if (!focused) {
      cancelAnimation(scale);
      cancelAnimation(rotate);
      scale.value = 1;
      rotate.value = 0;
      return;
    }

    // close → spring open
    scale.value = withSequence(
      withTiming(0.75, { duration: 100 }),
      withSpring(1, { damping: 18, stiffness: 220 }),
    );
    rotate.value = withSequence(
      withTiming(-0.08, { duration: 100 }),
      withSpring(0, { damping: 18, stiffness: 220 }),
    );
  }, [focused]);

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotate.value}rad` }],
  }));

  return <Animated.View style={rStyle}>{children}</Animated.View>;
};
