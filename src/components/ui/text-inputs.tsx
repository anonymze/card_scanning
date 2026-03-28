import { cn } from '@/libs/tailwind';
import { MyTouchableOpacity } from '@/components/my-pressable';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Text, TextInput as RNTextInput, TextInputProps, View } from 'react-native';
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

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeOffset.value }],
  }));

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
    <Animated.View style={animatedStyle}>
      <View className="mb-6 justify-center">
        <RNTextInput
          autoCorrect={false}
          autoComplete="off"
          spellCheck={false}
          ref={inputRef}
          hitSlop={5}
          className={cn(
            'border-foreground-darker/30 bg-background-primary-darker text-foreground rounded-lg border px-4 py-4 pr-10 font-sans text-sm',
            className,
          )}
          maxLength={24}
          placeholderTextColor={grayLight}
          placeholder={placeholder}
          {...props}
          onChangeText={handle_change}
        />
        {has_value ? (
          <MyTouchableOpacity
            onPress={handle_clear}
            hitSlop={10}
            className="bg-foreground-darker/30 absolute right-3 h-6 w-6 items-center justify-center rounded-full"
          >
            <Text className="text-foreground text-xs font-bold leading-none">✕</Text>
          </MyTouchableOpacity>
        ) : null}
      </View>
    </Animated.View>
  );
};

export { TextInput };
