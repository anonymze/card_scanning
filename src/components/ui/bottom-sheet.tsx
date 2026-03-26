import { TrueSheet } from '@lodev09/react-native-true-sheet';
import React from 'react';
import { View } from 'react-native';
import { useCSSVariable } from 'uniwind';

export type BottomSheetRef = TrueSheet;

type BottomSheetProps = {
  sheetRef: React.RefObject<BottomSheetRef | null>;
  children: React.ReactNode;
  detents?: React.ComponentProps<typeof TrueSheet>['detents'];
  cornerRadius?: number;
};

export function BottomSheet({
  sheetRef,
  children,
  detents = [0.88],
  cornerRadius = 30,
}: BottomSheetProps) {
  const [bgDarker, foregroundDarker] = useCSSVariable([
    '--color-background-primary-darker',
    '--color-foreground-darker',
  ]);

  return (
    <TrueSheet
      ref={sheetRef}
      detents={detents}
      cornerRadius={cornerRadius}
      backgroundColor={bgDarker}
      grabberOptions={{ topMargin: 14, color: foregroundDarker, adaptive: false }}
    >
      <View className="px-5 py-10">
        {children}
      </View>
    </TrueSheet>
  );
}
