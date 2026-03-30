import { cn } from '@/libs/tailwind';
import React from 'react';
import { View } from 'react-native';
import { useCSSVariable } from 'uniwind';

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
    <View
      style={[
        {
          experimental_backgroundImage: `linear-gradient(160deg, ${bgDarker}, ${bgLighter}, ${bg})`,
        },
      ]}
      className={cn('py-safe flex-1 px-4', className)}
    >
      {children}
    </View>
  );
}
