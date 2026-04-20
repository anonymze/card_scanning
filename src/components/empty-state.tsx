import { EmptyCardsIllustration, EmptyStateVariant } from '@/components/icons';
import { useFocusEffect } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { Button } from './ui/buttons';
import { Text } from './ui/texts';

type EmptyStateProps = {
  variant: EmptyStateVariant;
  title: string;
  buttonText: string;
  subtitle?: string;
  size?: number;
  onPress?: () => void;
};

function AnimatedIllustration({
  size,
  variant,
}: {
  size: number;
  variant: EmptyStateVariant;
}) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);

  React.useEffect(() => {
    const push = { damping: 5, stiffness: 120, mass: 0.6 };
    const back = { damping: 35, stiffness: 550 };

    translateX.value = withDelay(
      50,
      withSequence(withSpring(5, push), withSpring(0, back)),
    );
    translateY.value = withDelay(
      50,
      withSequence(withSpring(4, push), withSpring(0, back)),
    );
    rotate.value = withDelay(
      50,
      withSequence(withSpring(2.5, push), withSpring(0, back)),
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  return (
    <Animated.View style={[animatedStyle, { marginBottom: -40 }]}>
      <EmptyCardsIllustration size={size} variant={variant} />
    </Animated.View>
  );
}

export const EmptyState = ({
  variant,
  title,
  subtitle,
  buttonText,
  size = 280,
  onPress,
}: EmptyStateProps) => {
  const [animKey, setAnimKey] = React.useState(0);

  useFocusEffect(
    React.useCallback(() => {
      setAnimKey((k) => k + 1);
    }, []),
  );

  return (
    <View className="flex-1 items-center justify-center gap-4">
      <AnimatedIllustration key={animKey} size={size} variant={variant} />
      <View className="items-center gap-2 pt-5">
        <Text className="font-sans-semibold text-foreground text-center text-xl">
          {title}
        </Text>
        {subtitle ? (
          <Text className="text-foreground-darker max-w-72 text-center">
            {subtitle}
          </Text>
        ) : null}
        <Button title={buttonText} onPress={onPress} className="mt-4" />
      </View>
    </View>
  );
};
