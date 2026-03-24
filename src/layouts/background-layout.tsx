import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useCSSVariable } from 'uniwind';

export default function BackgroundLayout({
  children,
  scrollable = true,
}: {
  children: React.ReactNode;
  scrollable?: boolean;
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
      className="p-safe flex-1"
    >
      {scrollable ? (
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          className="flex-1"
        >
          {children}
        </ScrollView>
      ) : (
        <>{children}</>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
