import { cardsInfiniteQueryOptions } from '@/api/cards-queries';
import { EmptyState } from '@/components/empty-state';
import { EyeIcon } from '@/components/icons';
import { MyTouchableOpacity } from '@/components/my-pressable';
import { BottomSheet, BottomSheetRef } from '@/components/ui/bottom-sheet';
import { Text, TextTitle } from '@/components/ui/texts';
import BackgroundLayout from '@/layouts/background-layout';
import { useCollections } from '@/stores/collections-store';
import type { ScryfallCard } from '@/types/cards';
import { LegendList } from '@legendapp/list/react-native';
import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const MTG_COLORS: Record<string, string> = {
  W: '#F9FAF4',
  U: '#0E68AB',
  B: '#150B00',
  R: '#D3202A',
  G: '#00733E',
};

function getCardColor(card: ScryfallCard): string {
  const colors = card.colors ?? card.color_identity;
  if (!colors || colors.length === 0) return '#9CA3AF';
  if (colors.length > 1) return '#E5A020';
  return MTG_COLORS[colors[0]] ?? '#9CA3AF';
}

function CardRow({ item }: { item: ScryfallCard }) {
  const typeLine = item.type_line?.split('—')[0]?.trim() ?? '';
  const subtitle = [typeLine, item.set_name].filter(Boolean).join(' · ');

  return (
    <View
      className="border-background-primary-lighter bg-background-primary mb-2 overflow-hidden rounded-2xl border"
    >
      <View className="flex-row items-center px-3 py-3">
        <View className="flex-1">
          <Text className="text-sm font-semibold text-white" numberOfLines={1}>
            {item.name}
          </Text>
          <Text className="text-gray text-xs" numberOfLines={1}>
            {subtitle || '—'}
          </Text>
        </View>
        <MyTouchableOpacity onPress={() => {}} className="pl-3">
          <EyeIcon color="hsl(215, 20%, 65%)" width={18} height={18} />
        </MyTouchableOpacity>
      </View>
      <View
        className="h-0.5 pt-1"
        style={{ backgroundColor: getCardColor(item) }}
      />
    </View>
  );
}

export default function Page() {
  const sheetRef = React.useRef<BottomSheetRef>(null);
  const collections = useCollections((s) => s.collections);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(cardsInfiniteQueryOptions({ q: '*' }));

  const cards = React.useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );

  const handleCreateCollection = React.useCallback(() => {
    sheetRef.current?.present();
  }, []);

  return (
    <BackgroundLayout scrollable={collections.length > 0}>
      {collections.length === 0 ? (
        <EmptyState
          buttonText="+ Create a collection"
          variant="collection"
          title="Your collection is empty"
          subtitle="Scan cards or add them manually to build your first collection"
          onPress={handleCreateCollection}
        />
      ) : null}
      <BottomSheet sheetRef={sheetRef}>
        <TextTitle className="pb-4">New Collection</TextTitle>
        <LegendList
          data={cards}
          renderItem={({ item }) => <CardRow item={item} />}
          keyExtractor={(item) => item.id}
          estimatedItemSize={56}
          recycleItems
          decelerationRate="fast"
          drawDistance={400}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 180 }}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.2}
          ListFooterComponent={
            <ActivityIndicator
              colorClassName="accent-foreground-darker"
              className="py-5"
            />
          }
        />
      </BottomSheet>
    </BackgroundLayout>
  );
}
