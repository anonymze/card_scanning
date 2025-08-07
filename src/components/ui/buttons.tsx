import React from 'react';
import { Pressable, Text } from 'react-native';
import Animated from 'react-native-reanimated';

const PressableAnimated = Animated.createAnimatedComponent(Pressable);

const ButtonPrimary = ({
  title,
  icon,
  action
}: {
  title: string;
  icon?: React.ReactNode;
  action: () => void;
}) => {
  const [scale, setScale] = React.useState(false);
  return (
    <PressableAnimated
      onPressIn={()=> {
        setScale(true);
      }}
      onPressOut={()=> {
        setScale(false);
      }}
      onPress={action}
      style={{
        transitionProperty: 'transform',
        transitionDuration: 200,
        transform: scale ? [{ scale: 0.95 }] : [{ scale: 1 }]
      }}
      className="w-full flex-row items-center justify-center gap-x-4 rounded-2xl border border-foregroundLight/50 bg-background-primary p-5"
    >
      {icon ? icon : null}
      <Text className="text-xl font-bold text-foreground">{title}</Text>
    </PressableAnimated>
  );
};

export { ButtonPrimary };
