import { AddCardSheet } from '@/components/add-card-sheet';
import { BottomSheetRef } from '@/components/bottom-sheet';
import { EmptyState } from '@/components/empty-state';
import { ScrollList } from '@/components/scroll-list';
import { FAB } from '@/components/ui/fab';
import { TextInput, TextInputRef } from '@/components/ui/text-inputs';
import { Text } from '@/components/ui/texts';
import BackgroundLayout from '@/layouts/background-layout';
import { Header } from '@/layouts/header';
import { useCollections } from '@/stores/collections-store';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function Page() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const collection = useCollections((s) =>
    s.collections.find((c) => c.id === id),
  );
  const deleteCollection = useCollections((s) => s.deleteCollection);
  const inputRef = React.useRef<TextInputRef>(null);
  const sheetRef = React.useRef<BottomSheetRef>(null);
  const [search, setSearch] = React.useState('');

  if (!collection) return null;

  const query = search.trim().toLowerCase();
  const filteredCards = query
    ? collection.cards.filter((c) =>
        c.card.name.toLowerCase().includes(query),
      )
    : collection.cards;

  const handleAdd = () => {
    sheetRef.current?.present();
  };

  return (
    <BackgroundLayout>
      <Header
        title={collection.name}
        subtitle="Collection"
        actions={[
          { label: 'Rename', onPress: () => {} },
          {
            label: 'Delete',
            destructive: true,
            onPress: () => {
              deleteCollection(collection.id);
              router.back();
            },
          },
        ]}
      />
      {collection.cards.length === 0 ? (
        <EmptyState
          variant="collection"
          title="No cards yet"
          subtitle="Tap the + button to add your first card"
        />
      ) : (
        <View className="mt-4 flex-1">
          <TextInput
            ref={inputRef}
            placeholder="Search cards..."
            onChangeText={setSearch}
          />
          {filteredCards.length === 0 ? (
            <View className="items-center justify-center pt-12">
              <Text className="text-gray text-sm">No cards match "{search}"</Text>
            </View>
          ) : (
            <ScrollList
              data={filteredCards}
              keyExtractor={(item) => item.id}
              estimatedItemSize={56}
              renderItem={({ item }) => (
                <View className="border-foreground-darker/20 flex-row items-center justify-between border-b py-3">
                  <Text className="text-foreground flex-1" numberOfLines={1}>
                    {item.card.name}
                  </Text>
                  <Text className="text-gray font-sans-semibold ml-3 text-sm">
                    ×{item.quantity}
                  </Text>
                </View>
              )}
            />
          )}
        </View>
      )}
      <FAB onPress={handleAdd} />
      <AddCardSheet
        sheetRef={sheetRef}
        type="collection"
        id={collection.id}
      />
    </BackgroundLayout>
  );
}
