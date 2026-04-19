import { cn } from '@/libs/tailwind';
import * as Haptics from 'expo-haptics';
import React from 'react';
import {
  Pressable,
  TextInput as RNTextInput,
  Text,
  TextInputProps,
  View,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useCSSVariable } from 'uniwind';

const SHAKE_TIME = 80;
const SHAKE_OFFSET = 5;
const CLEAR_BUTTON_SPACE = 40;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type TextInputRef = {
  shake: () => void;
  getValue: () => string;
  clear: () => void;
};

const TextInput = ({
  placeholder,
  className,
  ref,
  ...props
}: {
  placeholder: string;
  className?: string;
  ref?: React.Ref<TextInputRef>;
} & Omit<TextInputProps, 'placeholder'>) => {
  const [grayLight] = useCSSVariable(['--color-gray-lighter']);
  const shakeOffset = useSharedValue(0);
  const inputRef = React.useRef<RNTextInput>(null);
  const valueRef = React.useRef('');
  const onChangeRef = React.useRef(props.onChangeText);
  onChangeRef.current = props.onChangeText;
  const [hasValue, setHasValue] = React.useState(false);
  const [inputWidth, setInputWidth] = React.useState(0);

  React.useImperativeHandle(ref, () => ({
    shake: () => {
      shakeOffset.value = withSequence(
        withTiming(-SHAKE_OFFSET, { duration: SHAKE_TIME / 2 }),
        withRepeat(withTiming(SHAKE_OFFSET, { duration: SHAKE_TIME }), 3, true),
        withTiming(0, { duration: SHAKE_TIME / 2 }),
      );
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    },
    getValue: () => valueRef.current,
    clear: () => {
      valueRef.current = '';
      setHasValue(false);
      inputRef.current?.clear();
      onChangeRef.current?.('');
    },
  }));

  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeOffset.value }],
  }));

  const targetWidth = hasValue
    ? inputWidth - CLEAR_BUTTON_SPACE
    : inputWidth;

  const inputAnimatedStyle = useAnimatedStyle(() => {
    if (!inputWidth) return {};
    return {
      width: withSpring(targetWidth, {
        damping: 30,
        stiffness: 800,
        mass: 0.7,
      }),
    };
  });

  const handleChange = React.useCallback((text: string) => {
    valueRef.current = text;
    setHasValue(text.length > 0);
    onChangeRef.current?.(text);
  }, []);

  const handleClear = React.useCallback(() => {
    valueRef.current = '';
    setHasValue(false);
    inputRef.current?.clear();
    onChangeRef.current?.('');
  }, []);

  return (
    <Animated.View
      style={shakeStyle}
      className="mb-6"
      onLayout={(e) => setInputWidth(e.nativeEvent.layout.width)}
    >
      <View className="flex-row items-center">
        <Animated.View style={inputAnimatedStyle}>
          <RNTextInput
            autoCorrect={false}
            autoComplete="off"
            spellCheck={false}
            autoCapitalize="none"
            textContentType="none"
            importantForAutofill="no"
            ref={inputRef}
            className={cn(
              'border-foreground-darker/30 bg-background-primary-darker text-foreground rounded-lg border px-4 py-4 font-sans text-sm',
              className,
            )}
            maxLength={24}
            placeholderTextColor={grayLight}
            placeholder={placeholder}
            {...props}
            onChangeText={handleChange}
          />
        </Animated.View>
        {hasValue ? (
          <AnimatedPressable
            entering={FadeIn.duration(150)}
            exiting={FadeOut.duration(150)}
            onPress={handleClear}
            hitSlop={10}
            className="bg-foreground-darker/30 ml-2 h-6 w-6 items-center justify-center rounded-full"
          >
            <Text className="text-foreground text-xs leading-none font-bold">
              ✕
            </Text>
          </AnimatedPressable>
        ) : null}
      </View>
    </Animated.View>
  );
};

export { TextInput };
