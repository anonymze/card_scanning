import { cn } from '@/libs/tailwind';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Pressable, Text, TextInput as RNTextInput, TextInputProps, View } from 'react-native';
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
}: { placeholder: string; className?: string; ref?: React.Ref<TextInputRef> } & Omit<
  TextInputProps,
  'placeholder'
>) => {
  const [grayLight] = useCSSVariable(['--color-gray-lighter']);
  const shakeOffset = useSharedValue(0);
  const inputRef = React.useRef<RNTextInput>(null);
  const valueRef = React.useRef('');
  const on_change_ref = React.useRef(props.onChangeText);
  on_change_ref.current = props.onChangeText;
  const [has_value, set_has_value] = React.useState(false);
  const [input_width, set_input_width] = React.useState(0);

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
      set_has_value(false);
      inputRef.current?.clear();
      on_change_ref.current?.('');
    },
  }));

  const shake_style = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeOffset.value }],
  }));

  const target_width = has_value ? input_width - CLEAR_BUTTON_SPACE : input_width;

  const input_animated_style = useAnimatedStyle(() => {
    if (!input_width) return {};
    return {
      width: withSpring(target_width, {
        damping: 30,
        stiffness: 800,
        mass: 0.7,
      }),
    };
  });

  const handle_change = React.useCallback((text: string) => {
    valueRef.current = text;
    set_has_value(text.length > 0);
    on_change_ref.current?.(text);
  }, []);

  const handle_clear = React.useCallback(() => {
    valueRef.current = '';
    set_has_value(false);
    inputRef.current?.clear();
    on_change_ref.current?.('');
  }, []);

  return (
    <Animated.View
      style={shake_style}
      className="mb-6"
      onLayout={(e) => set_input_width(e.nativeEvent.layout.width)}
    >
      <View className="flex-row items-center">
        <Animated.View style={input_animated_style}>
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
            onChangeText={handle_change}
          />
        </Animated.View>
        {has_value ? (
          <AnimatedPressable
            entering={FadeIn.duration(150)}
            exiting={FadeOut.duration(150)}
            onPress={handle_clear}
            hitSlop={10}
            className="ml-2 bg-foreground-darker/30 h-6 w-6 items-center justify-center rounded-full"
          >
            <Text className="text-foreground text-xs font-bold leading-none">✕</Text>
          </AnimatedPressable>
        ) : null}
      </View>
    </Animated.View>
  );
};

export { TextInput };
