import { cn } from '@/libs/tailwind';
import { StyleSheet, Text, View } from 'react-native';
import { useCSSVariable } from 'uniwind';
import { MyTouchableScaleOpacity } from '../my-pressable';

const Button = ({
  title,
  onPress,
  variant = 'primary',
  className,
}: {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}) => {
  const [foreground, foregroundLighter, foregroundDarker] = useCSSVariable([
    '--color-foreground',
    '--color-foreground-lighter',
    '--color-foreground-darker',
  ]);

  return (
    <MyTouchableScaleOpacity
      className={cn(
        'h-14 flex-row items-center justify-center gap-3 overflow-hidden rounded-2xl px-10 py-2',

        className,
      )}
      style={{
        boxShadow: `0 0 16px 4px ${foregroundDarker}30`,
      }}
      onPress={onPress}
      hitSlop={10}
    >
      <View
        pointerEvents="none"
        className="rounded-2xl"
        style={[
          StyleSheet.absoluteFill,
          {
            experimental_backgroundImage: `linear-gradient(50deg, ${foregroundLighter}, ${foreground}, ${foregroundDarker})`,
          },
        ]}
      />
      <Text className="font-sans-semibold text-background-primary-darker text-lg">
        {title}
      </Text>
    </MyTouchableScaleOpacity>
  );
};

export { Button };
