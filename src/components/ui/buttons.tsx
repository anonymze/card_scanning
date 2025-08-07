import { cn } from '@/lib/tailwind';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import config from 'tailwind.config';

const PressableAnimated = Animated.createAnimatedComponent(Pressable);

const Button = ({
  children,
  action,
  className,
}: {
  children: React.ReactNode;
  action?: () => void;
  className?: string;
}) => {
  const [scale, setScale] = React.useState(false);

  return (
    <PressableAnimated
      onPressIn={() => {
        setScale(true);
      }}
      onPressOut={() => {
        setScale(false);
      }}
      onPress={action}
      style={{
        transitionProperty: 'transform',
        transitionDuration: 180,
        transform: scale ? [{ scale: 0.97 }] : [{ scale: 1 }],
      }}
      className={cn(
        'w-full flex-row items-center justify-center gap-x-4 rounded-2xl',
        className,
      )}
    >
      {children}
    </PressableAnimated>
  );
};

const ButtonPrimary = ({
  title,
  icon,
  action,
}: {
  title: string;
  action?: () => void;
  icon?: React.ReactNode;
}) => {
  return (
    <Button
      action={action}
      className="border border-foregroundLight/50 bg-background-primary p-5"
    >
      {icon ? icon : null}
      <Text className="text-xl font-bold text-foreground">{title}</Text>
    </Button>
  );
};

const ButtonSecondary = ({
  title,
  action,
  icon,
}: {
  title: string;
  action?: () => void;
  icon?: React.ReactNode;
}) => {
  return (
    <Button
      action={action}
      className="overflow-hidden border border-white bg-background-secondaryLight p-5"
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={[
          config.theme.extend.colors.background.secondary, // slate-900 (top-left)
          config.theme.extend.colors.background.secondaryDark, // slate-800 (bottom-right)
        ]}
        style={StyleSheet.absoluteFill}
      />
      <Text className="text-xl font-bold text-white">{title}</Text>
    </Button>
  );
};

export { ButtonPrimary, ButtonSecondary };
