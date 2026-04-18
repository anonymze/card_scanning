import { TrueSheet } from '@lodev09/react-native-true-sheet';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
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
  const { width } = useWindowDimensions();
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
      grabberOptions={{
        topMargin: 14,
        color: foregroundDarker,
        adaptive: false,
      }}
    >
      <GestureHandlerRootView
        style={{ flexGrow: 1, width }}
        className="px-5 pt-10"
      >
        {children}
      </GestureHandlerRootView>
    </TrueSheet>
  );
}
