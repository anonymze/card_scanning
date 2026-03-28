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
  scrollable?: boolean;
  onDidDismiss?: () => void;
};

export function BottomSheet({
  sheetRef,
  children,
  detents = ['auto'],
  cornerRadius = 30,
  scrollable = false,
  onDidDismiss,
}: BottomSheetProps) {
  const [bgDarker, foregroundDarker] = useCSSVariable([
    '--color-background-primary-darker',
    '--color-foreground-darker',
  ]);

  return (
    <TrueSheet
      scrollable={scrollable}
      ref={sheetRef}
      detents={detents}
      cornerRadius={cornerRadius}
      backgroundColor={bgDarker}
      onDidDismiss={onDidDismiss}
      grabberOptions={{ topMargin: 14, color: foregroundDarker, adaptive: false }}
    >
      <View className="px-5 pt-10">
        {children}
      </View>
    </TrueSheet>
  );
}
