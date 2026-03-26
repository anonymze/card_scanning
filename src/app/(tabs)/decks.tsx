import { EmptyState } from '@/components/empty-state';
import { BottomSheet, BottomSheetRef } from '@/components/ui/bottom-sheet';
import { TextTitle } from '@/components/ui/texts';
import BackgroundLayout from '@/layouts/background-layout';
import React from 'react';

export default function Page() {
  const decks: unknown[] = [];
  const sheetRef = React.useRef<BottomSheetRef>(null);

  const handleCreateDeck = React.useCallback(() => {
    sheetRef.current?.present();
  }, []);

  return (
    <BackgroundLayout scrollable={decks.length > 0}>
      {decks.length === 0 ? (
        <EmptyState
          buttonText="+ Create a deck"
          variant="decks"
          title="No decks yet"
          subtitle="Scan cards or add them manually to build your first deck"
          onPress={handleCreateDeck}
        />
      ) : null}
      <BottomSheet sheetRef={sheetRef}>
        <TextTitle>New deck</TextTitle>
      </BottomSheet>
    </BackgroundLayout>
  );
}
