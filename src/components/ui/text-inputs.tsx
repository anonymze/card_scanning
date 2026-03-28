import { cn } from '@/libs/tailwind';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { TextInput as RNTextInput, TextInputProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useCSSVariable } from 'uniwind';

const SHAKE_TIME = 80;
const SHAKE_OFFSET = 5;

export type TextInputRef = {
  shake: () => void;
  // focus: () => void;
  // blur: () => void;
};

const TextInput = ({
  placeholder,
  className,
  ref,
  ...props
}: { placeholder: string; className?: string; ref?: React.Ref<TextInputRef> } & Omit<
  TextInputProps,
  'placeholder'
>) => {
  const [grayLight] = useCSSVariable(['--color-gray-lighter']);
  const shakeOffset = useSharedValue(0);
  const inputRef = React.useRef<RNTextInput>(null);

  React.useImperativeHandle(ref, () => ({
    shake: () => {
      shakeOffset.value = withSequence(
        withTiming(-SHAKE_OFFSET, { duration: SHAKE_TIME / 2 }),
        withRepeat(withTiming(SHAKE_OFFSET, { duration: SHAKE_TIME }), 3, true),
        withTiming(0, { duration: SHAKE_TIME / 2 }),
      );
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    },
    // focus: () => inputRef.current?.focus(),
    // blur: () => inputRef.current?.blur(),
  }));

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeOffset.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <RNTextInput
        ref={inputRef}
        hitSlop={5}
        className={cn(
          'border-foreground-darker/30 bg-background-primary-darker text-foreground mb-6 rounded-lg border px-4 py-4 font-sans text-sm',
          className,
        )}
        maxLength={20}
        placeholderTextColor={grayLight}
        placeholder={placeholder}
        {...props}
      />
    </Animated.View>
  );
};

export { TextInput };
