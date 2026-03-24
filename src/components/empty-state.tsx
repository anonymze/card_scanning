import { EmptyCardsIllustration, EmptyStateVariant } from '@/components/icons';
import { useFocusEffect } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { useCSSVariable } from 'uniwind';
import { MyTouchableScaleOpacity } from './my-pressable';
import { Text } from './ui/texts';

type EmptyStateProps = {
  variant: EmptyStateVariant;
  title: string;
  buttonText: string;
  subtitle?: string;
  size?: number;
};

export const EmptyState = ({
  variant,
  title,
  subtitle,
  buttonText,
  size = 280,
}: EmptyStateProps) => {
  const [foreground, foregroundLighter, foregroundDarker] = useCSSVariable([
    '--color-foreground',
    '--color-foreground-lighter',
    '--color-foreground-darker',
  ]);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);

  useFocusEffect(
    React.useCallback(() => {
      cancelAnimation(translateX);
      cancelAnimation(translateY);
      cancelAnimation(rotate);
      translateX.value = 0;
      translateY.value = 0;
      rotate.value = 0;

      const push = { damping: 5, stiffness: 120, mass: 0.6 };
      const back = { damping: 10, stiffness: 80 };

      translateX.value = withDelay(50, withSequence(withSpring(5, push), withSpring(0, back)));
      translateY.value = withDelay(50, withSequence(withSpring(4, push), withSpring(0, back)));
      rotate.value = withDelay(50, withSequence(withSpring(2.5, push), withSpring(0, back)));
    }, []),
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  return (
    <View className="flex-1 items-center justify-center gap-4">
      <Animated.View style={animatedStyle}>
        <EmptyCardsIllustration size={size} variant={variant} />
      </Animated.View>
      <View className="items-center gap-2">
        <Text className="text-center text-xl font-semibold text-foreground">
          {title}
        </Text>
        {subtitle ? (
          <Text className="max-w-72 text-center text-foreground-darker">
            {subtitle}
          </Text>
        ) : null}

        <MyTouchableScaleOpacity
          onPress={() => {}}
          className="mt-4 h-14 flex-row items-center gap-3 rounded-2xl px-10 py-2"
          style={{
            experimental_backgroundImage: `linear-gradient(50deg, ${foregroundLighter}, ${foreground}, ${foregroundDarker})`,
            boxShadow: `0 0 16px 4px ${foregroundDarker}30`,
          }}
        >
          <Text className="text-lg font-semibold text-background-primary-darker">
            {buttonText}
          </Text>
        </MyTouchableScaleOpacity>
      </View>
    </View>
  );
};
