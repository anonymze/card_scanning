import { BottomSheet, BottomSheetRef } from '@/components/bottom-sheet';
import { CardFrame } from '@/components/card-frame';
import { EmptyState } from '@/components/empty-state';
import { ListCard } from '@/components/list-card';
import { ScrollList } from '@/components/scroll-list';
import { Button } from '@/components/ui/buttons';
import { TextInput, TextInputRef } from '@/components/ui/text-inputs';
import { Text } from '@/components/ui/texts';
import BackgroundLayout from '@/layouts/background-layout';
import { BlurHeader } from '@/layouts/blur-header';
import { useDecks } from '@/stores/decks-store';
import React from 'react';

export default function Page() {
  const sheetRef = React.useRef<BottomSheetRef>(null);
  const inputRef = React.useRef<TextInputRef>(null);
  const decks = useDecks((s) => s.decks);
  const createDeck = useDecks((s) => s.createDeck);
  const deleteDeck = useDecks((s) => s.deleteDeck);
  const [sheetTitle, setSheetTitle] = React.useState('New Deck');
  const initialIdsRef = React.useRef(new Set(decks.map((d) => d.id)));

  const handleCreate = React.useCallback(() => {
    const value = inputRef.current?.getValue()?.trim() ?? '';

    if (!value) {
      inputRef.current?.shake();
      return;
    }

    createDeck(value, '');
    inputRef.current?.clear();
    setSheetTitle('New Deck');
    sheetRef.current?.dismiss();
  }, [createDeck]);

  return (
    <BackgroundLayout noTopPadding>
      {decks.length === 0 ? (
        <EmptyState
          buttonText="+ Create a deck"
          variant="decks"
          title="No decks yet"
          subtitle="Scan cards or add them manually to build your first deck"
          onPress={() => {
            sheetRef.current?.present();
          }}
        />
      ) : (
        <>
          <ScrollList
            blurHeader
            data={decks}
            extraData={decks.length}
            keyExtractor={(item) => item.id}
            estimatedItemSize={180}
            recycleItems
            renderItem={({ item }) => (
              <ListCard
                item={item}
                variant="deck"
                animate={!initialIdsRef.current.has(item.id)}
                onDelete={() => deleteDeck(item.id)}
              />
            )}
          />
          <BlurHeader
            title="Decks"
            rightSlot={
              <Button
                title="+ New"
                onPress={() => sheetRef.current?.present()}
                className="h-11 px-5"
              />
            }
          />
        </>
      )}
      <BottomSheet
        sheetRef={sheetRef}
        onDidDismiss={() => {
          setSheetTitle('New Deck');
          inputRef.current?.clear();
        }}
      >
        <CardFrame title={sheetTitle} variant="deck">
          <Text className="font-sans-semibold text-gray mb-2 text-sm">
            Title
          </Text>
          <TextInput
            ref={inputRef}
            placeholder="My deck name"
            onChangeText={(text) => {
              setSheetTitle(text.trim() || 'New Deck');
            }}
          />
          <Button title="Create deck" onPress={handleCreate} />
        </CardFrame>
      </BottomSheet>
    </BackgroundLayout>
  );
}
