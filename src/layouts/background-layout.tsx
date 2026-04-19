import { cn } from '@/libs/tailwind';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCSSVariable } from 'uniwind';

export const LAYOUT_PADDING_INLINE = 16;

export default function BackgroundLayout({
  children,
  className,
  noTopPadding,
}: {
  children: React.ReactNode;
  className?: string;
  noTopPadding?: boolean;
}) {
  const insets = useSafeAreaInsets();
  const [bgDarker, bgLighter, bg] = useCSSVariable([
    '--color-background-primary-darker',
    '--color-background-primary-lighter',
    '--color-background-primary',
  ]);

  return (
    <View
      style={{
        paddingTop: noTopPadding ? 0 : insets.top,
        // paddingBottom: insets.bottom,
        paddingLeft: insets.left + LAYOUT_PADDING_INLINE,
        paddingRight: insets.right + LAYOUT_PADDING_INLINE,
        experimental_backgroundImage: `linear-gradient(160deg, ${bgDarker}, ${bgLighter}, ${bg})`,
      }}
      className={cn('flex-1', className)}
    >
      {children}
    </View>
  );
}
