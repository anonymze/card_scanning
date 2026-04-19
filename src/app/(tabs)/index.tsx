import { BottomSheet, BottomSheetRef } from '@/components/bottom-sheet';
import { CardFrame } from '@/components/card-frame';
import { EmptyState } from '@/components/empty-state';
import { Button } from '@/components/ui/buttons';
import { TextInput, TextInputRef } from '@/components/ui/text-inputs';
import { Text } from '@/components/ui/texts';
import { ScrollList } from '@/components/scroll-list';
import BackgroundLayout from '@/layouts/background-layout';
import { BlurHeader } from '@/layouts/blur-header';
import { useCollections } from '@/stores/collections-store';
import type { Collection } from '@/types/collection';
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

function getTypeBreakdown(collection: Collection) {
  const counts: Record<string, number> = {};

  for (const entry of collection.cards) {
    const rawType = entry.card.type_line.split('—')[0]?.trim() ?? '';
    const matchedType = CARD_TYPES.find((t) => rawType.includes(t));
    const label = matchedType ?? 'Other';
    counts[label] = (counts[label] ?? 0) + entry.quantity;
  }

  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
}

function CollectionCard({
  collection,
  onDelete,
}: {
  collection: Collection;
  onDelete: () => void;
}) {
  const totalCards = collection.cards.reduce((sum, c) => sum + c.quantity, 0);
  const typeBreakdown = getTypeBreakdown(collection);

  return (
    <Animated.View
      entering={FadeInDown.duration(400).easing(Easing.bezier(0.16, 1, 0.3, 1))}
      className="mb-4"
    >
      <CardFrame title={collection.name} onDelete={onDelete}>
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
  const collections = useCollections((s) => s.collections);
  const createCollection = useCollections((s) => s.createCollection);
  const deleteCollection = useCollections((s) => s.deleteCollection);
  const [sheetTitle, setSheetTitle] = React.useState('New Collection');
  // const posthog = usePostHog();

  const handleCreate = React.useCallback(() => {
    const value = inputRef.current?.getValue()?.trim() ?? '';

    if (!value) {
      inputRef.current?.shake();
      return;
    }

    const collection = createCollection(value, '');
    // posthog.capture('collection_created', {
    //   collection_name: collection.name,
    //   collection_id: collection.id,
    // });
    inputRef.current?.clear();
    setSheetTitle('New Collection');
    sheetRef.current?.dismiss();
  }, [createCollection]);

  return (
    <BackgroundLayout noTopPadding>
      {collections.length === 0 ? (
        <EmptyState
          buttonText="+ Create a collection"
          variant="collection"
          title="Your collection is empty"
          subtitle="Scan cards or add them manually to build your first collection"
          onPress={() => {
            sheetRef.current?.present();
          }}
        />
      ) : (
        <>
          <ScrollList
            blurHeader
            data={collections}
            extraData={collections.length}
            keyExtractor={(item) => item.id}
            estimatedItemSize={180}
            recycleItems
            renderItem={({ item }) => (
              <CollectionCard
                collection={item}
                onDelete={() => {
                  deleteCollection(item.id);
                }}
              />
            )}
          />
          <BlurHeader
            title="Collections"
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
          setSheetTitle('New Collection');
          inputRef.current?.clear();
        }}
      >
        <CardFrame title={sheetTitle}>
          <Text className="font-sans-semibold text-gray mb-2 text-sm">
            Title
          </Text>
          <TextInput
            ref={inputRef}
            placeholder="My collection name"
            onChangeText={(text) => {
              setSheetTitle(text.trim() || 'New Collection');
            }}
          />
          <Button title="Create collection" onPress={handleCreate} />
        </CardFrame>
      </BottomSheet>
    </BackgroundLayout>
  );
}
