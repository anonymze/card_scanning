import { PlusIcon } from '@/components/icons';
import { MyTouchableScale } from '@/components/my-pressable';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCSSVariable } from 'uniwind';

export function FAB({ onPress }: { onPress?: () => void }) {
  const insets = useSafeAreaInsets();
  const [foreground, foregroundLighter, foregroundDarker, bgPrimary] =
    useCSSVariable([
      '--color-foreground',
      '--color-foreground-lighter',
      '--color-foreground-darker',
      '--color-background-primary-darker',
    ]);

  return (
    <MyTouchableScale
      onPress={onPress}
      hitSlop={10}
      className="absolute right-4 h-14 w-14 items-center justify-center overflow-hidden rounded-full"
      style={{
        bottom: insets.bottom,
        boxShadow: `0 0 16px 4px ${foregroundDarker}40`,
      }}
    >
      <View
        className="rounded-full"
        style={[
          StyleSheet.absoluteFill,
          {
            experimental_backgroundImage: `linear-gradient(50deg, ${foregroundLighter}, ${foreground}, ${foregroundDarker})`,
          },
        ]}
      />
      <PlusIcon color={String(bgPrimary)} size={26} />
    </MyTouchableScale>
  );
}
