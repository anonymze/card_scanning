import React from 'react';
import { View } from 'react-native';
import { useCSSVariable } from 'uniwind';

export default function BackgroundLayout({
  children,
}: {
  children: React.ReactNode;
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
      className="py-safe flex-1 px-4"
    >
      {children}
    </View>
  );
}
