import { cn } from '@/libs/tailwind';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCSSVariable, withUniwind } from 'uniwind';

const StyledSafeAreaView = withUniwind(SafeAreaView);

export default function BackgroundLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [bgDarker, bgLighter, bg] = useCSSVariable([
    '--color-background-primary-darker',
    '--color-background-primary-lighter',
    '--color-background-primary',
  ]);

  return (
    <StyledSafeAreaView
      style={[
        {
          experimental_backgroundImage: `linear-gradient(160deg, ${bgDarker}, ${bgLighter}, ${bg})`,
        },
      ]}
      className={cn('flex-1 px-4', className)}
    >
      {children}
    </StyledSafeAreaView>
  );
}
