import { BottomSheet, BottomSheetRef } from '@/components/bottom-sheet';
import { CardFrame } from '@/components/card-frame';
import { EmptyState } from '@/components/empty-state';
import { Button } from '@/components/ui/buttons';
import { TextInput, TextInputRef } from '@/components/ui/text-inputs';
import { Text } from '@/components/ui/texts';
import BackgroundLayout from '@/layouts/background-layout';
import { Header } from '@/layouts/header';
import { useDecks } from '@/stores/decks-store';
import type { Collection } from '@/types/collection';
import { LegendList } from '@legendapp/list/react-native';
import React from 'react';
import { View } from 'react-native';
import Animated, { Easing, FadeInDown } from 'react-native-reanimated';

const CARD_TYPES = [
  'Creature',
  'Instant',
  'Sorcery',
  'Enchantment',
  'Artifact',
  'Land',
  'Planeswalker',
  'Battle',
] as const;

function getTypeBreakdown(deck: Collection) {
  const counts: Record<string, number> = {};

  for (const entry of deck.cards) {
    const rawType = entry.card.type_line.split('—')[0]?.trim() ?? '';
    const matchedType = CARD_TYPES.find((t) => rawType.includes(t));
    const label = matchedType ?? 'Other';
    counts[label] = (counts[label] ?? 0) + entry.quantity;
  }

  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
}

function DeckCard({
  deck,
  onDelete,
}: {
  deck: Collection;
  onDelete: () => void;
}) {
  const totalCards = deck.cards.reduce((sum, c) => sum + c.quantity, 0);
  const typeBreakdown = getTypeBreakdown(deck);

  return (
    <Animated.View
      entering={FadeInDown.duration(400).easing(Easing.bezier(0.16, 1, 0.3, 1))}
      className="mb-4"
    >
      <CardFrame title={deck.name} onDelete={onDelete} variant="deck">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-foreground font-sans-semibold ml-auto text-sm">
            {totalCards} {totalCards === 1 ? 'card' : 'cards'}
          </Text>
        </View>

        {typeBreakdown.length > 0 ? (
          <View className="border-foreground-darker/20 border-t pt-3">
            {typeBreakdown.map(([type, count]) => (
              <View
                key={type}
                className="flex-row items-center justify-between py-1"
              >
                <Text className="text-gray text-xs">{type}</Text>
                <Text className="text-gray text-xs">{count}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text className="text-gray text-center text-xs italic">
            No cards yet
          </Text>
        )}
      </CardFrame>
    </Animated.View>
  );
}

export default function Page() {
  const sheetRef = React.useRef<BottomSheetRef>(null);
  const inputRef = React.useRef<TextInputRef>(null);
  const decks = useDecks((s) => s.decks);
  const createDeck = useDecks((s) => s.createDeck);
  const deleteDeck = useDecks((s) => s.deleteDeck);
  const [sheetTitle, setSheetTitle] = React.useState('New Deck');
  // const posthog = usePostHog();

  const handleCreate = React.useCallback(() => {
    const value = inputRef.current?.getValue()?.trim() ?? '';

    if (!value) {
      inputRef.current?.shake();
      return;
    }

    const deck = createDeck(value, '');
    // posthog.capture('deck_created', {
    //   deck_name: deck.name,
    //   deck_id: deck.id,
    // });
    inputRef.current?.clear();
    setSheetTitle('New Deck');
    sheetRef.current?.dismiss();
  }, [createDeck]);

  return (
    <BackgroundLayout>
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
          <Header
            title="Decks"
            rightSlot={
              <Button
                title="+ New"
                onPress={() => sheetRef.current?.present()}
                className="h-11 px-5"
              />
            }
          />
          <LegendList
            data={decks}
            extraData={decks.length}
            keyExtractor={(item) => item.id}
            estimatedItemSize={180}
            showsVerticalScrollIndicator={false}
            recycleItems
            renderItem={({ item }) => (
              <DeckCard
                deck={item}
                onDelete={() => {
                  // posthog.capture('deck_deleted', {
                  //   deck_name: item.name,
                  //   deck_id: item.id,
                  //   card_count: item.cards.reduce(
                  //     (sum, c) => sum + c.quantity,
                  //     0,
                  //   ),
                  // });
                  deleteDeck(item.id);
                }}
              />
            )}
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
