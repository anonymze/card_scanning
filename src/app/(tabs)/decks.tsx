import { BottomSheet, BottomSheetRef } from '@/components/bottom-sheet';
import { CardFrame } from '@/components/card-frame';
import { EmptyState } from '@/components/empty-state';
import { Button } from '@/components/ui/buttons';
import { TextInput, TextInputRef } from '@/components/ui/text-inputs';
import { Text } from '@/components/ui/texts';
import BackgroundLayout from '@/layouts/background-layout';
import { useDecks } from '@/stores/decks-store';
import type { Collection } from '@/types/collection';
import { LegendList } from '@legendapp/list/react-native';
import { usePostHog } from 'posthog-react-native';
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

function get_type_breakdown(deck: Collection) {
  const counts: Record<string, number> = {};

  for (const entry of deck.cards) {
    const raw_type = entry.card.type_line.split('—')[0]?.trim() ?? '';
    const matched_type = CARD_TYPES.find((t) => raw_type.includes(t));
    const label = matched_type ?? 'Other';
    counts[label] = (counts[label] ?? 0) + entry.quantity;
  }

  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
}

function DeckCard({
  deck,
  on_delete,
}: {
  deck: Collection;
  on_delete: () => void;
}) {
  const total_cards = deck.cards.reduce((sum, c) => sum + c.quantity, 0);
  const type_breakdown = get_type_breakdown(deck);

  return (
    <Animated.View
      entering={FadeInDown.duration(400).easing(Easing.bezier(0.16, 1, 0.3, 1))}
      className="mb-4"
    >
      <CardFrame title={deck.name} onDelete={on_delete} variant="deck">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-foreground font-sans-semibold ml-auto text-sm">
            {total_cards} {total_cards === 1 ? 'card' : 'cards'}
          </Text>
        </View>

        {type_breakdown.length > 0 ? (
          <View className="border-foreground-darker/20 border-t pt-3">
            {type_breakdown.map(([type, count]) => (
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
  const sheet_ref = React.useRef<BottomSheetRef>(null);
  const input_ref = React.useRef<TextInputRef>(null);
  const decks = useDecks((s) => s.decks);
  const create_deck = useDecks((s) => s.createDeck);
  const delete_deck = useDecks((s) => s.deleteDeck);
  const [sheet_title, set_sheet_title] = React.useState('New Deck');
  const posthog = usePostHog();

  const handle_create = React.useCallback(() => {
    const value = input_ref.current?.getValue()?.trim() ?? '';

    if (!value) {
      input_ref.current?.shake();
      return;
    }

    const deck = create_deck(value, '');
    posthog.capture('deck_created', {
      deck_name: deck.name,
      deck_id: deck.id,
    });
    input_ref.current?.clear();
    set_sheet_title('New Deck');
    sheet_ref.current?.dismiss();
  }, [create_deck, posthog]);

  return (
    <BackgroundLayout>
      {decks.length === 0 ? (
        <EmptyState
          buttonText="+ Create a deck"
          variant="decks"
          title="No decks yet"
          subtitle="Scan cards or add them manually to build your first deck"
          onPress={() => {
            sheet_ref.current?.present();
          }}
        />
      ) : (
        <>
          <View className="flex-row items-center justify-between pb-5">
            <Text className="font-cinzel-semibold text-foreground text-2xl">
              Decks
            </Text>
            <Button
              title="+ New"
              onPress={() => sheet_ref.current?.present()}
              className="h-11 px-5"
            />
          </View>
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
                on_delete={() => {
                  posthog.capture('deck_deleted', {
                    deck_name: item.name,
                    deck_id: item.id,
                    card_count: item.cards.reduce(
                      (sum, c) => sum + c.quantity,
                      0,
                    ),
                  });
                  delete_deck(item.id);
                }}
              />
            )}
          />
        </>
      )}
      <BottomSheet
        sheetRef={sheet_ref}
        onDidDismiss={() => {
          set_sheet_title('New Deck');
          input_ref.current?.clear();
        }}
      >
        <CardFrame title={sheet_title} variant="deck">
          <Text className="font-sans-semibold text-gray mb-2 text-sm">
            Title
          </Text>
          <TextInput
            ref={input_ref}
            placeholder="My deck name"
            onChangeText={(text) => {
              set_sheet_title(text.trim() || 'New Deck');
            }}
          />
          <Button title="Create deck" onPress={handle_create} />
        </CardFrame>
      </BottomSheet>
    </BackgroundLayout>
  );
}
