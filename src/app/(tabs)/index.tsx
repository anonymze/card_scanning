import { cardsInfiniteQueryOptions } from '@/api/cards-queries';
import { EmptyState } from '@/components/empty-state';
import { EyeIcon } from '@/components/icons';
import { MyTouchableOpacity } from '@/components/my-pressable';
import { BottomSheet, BottomSheetRef } from '@/components/ui/bottom-sheet';
import { Text, TextTitle } from '@/components/ui/texts';
import BackgroundLayout from '@/layouts/background-layout';
import { useCollections } from '@/stores/collections-store';
import type { ScryfallCard } from '@/types/cards';
import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import { TextInput, View } from 'react-native';

function CardRow({ item }: { item: ScryfallCard }) {
  const typeLine = item.type_line?.split('—')[0]?.trim() ?? '';
  const subtitle = [typeLine, item.set_name].filter(Boolean).join(' · ');

  return (
    <View className="border-background-primary-lighter bg-background-primary mb-2 h-16 overflow-hidden rounded-2xl border border-b-0">
      <View className="flex-row items-center px-3 py-3">
        <View className="flex-1">
          <Text
            className="font-sans-semibold text-sm text-white"
            numberOfLines={1}
          >
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
      <View className="h-1" style={{ backgroundColor: 'red' }} />
    </View>
  );
}

export default function Page() {
  const sheetRef = React.useRef<BottomSheetRef>(null);
  const collections = useCollections((s) => s.collections);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isLoading,
  } = useInfiniteQuery(cardsInfiniteQueryOptions({ q: '*' }));

  const cards = React.useMemo(
    () => data?.pages.flatMap((page) => page.data).slice(0, 90) ?? [],
    [data],
  );

  return (
    <BackgroundLayout scrollable={collections.length > 0}>
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
      ) : null}
      <BottomSheet sheetRef={sheetRef} scrollable>
        <TextTitle className="pb-4">New Collection</TextTitle>
        <Text className="font-sans-semibold text-gray mb-1 text-xs">Title</Text>
        <TextInput
          className="border-background-primary-lighter bg-background-primary text-foreground mb-4 rounded-xl border px-3 py-3 font-sans"
          placeholderTextColor="hsl(215, 20%, 45%)"
          placeholder="My collection name"
        />
        {/*<LegendList
          data={cards}
          renderItem={({ item }) => <CardRow item={item} />}
          keyExtractor={(item) => item.id}
          estimatedItemSize={64}
          recycleItems
          drawDistance={350}
          onEndReachedThreshold={0.4}
          decelerationRate="fast"
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          ListEmptyComponent={
            isLoading || isFetching ? (
              <LoadingPlaceholder title="Loading the cards..." size={180} />
            ) : (
              <NotFoundPlaceholder title="No cards found" size={180} />
            )
          }
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) fetchNextPage();
          }}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator
                colorClassName="accent-foreground-darker"
                className="pt-3"
              />
            ) : null
          }
        />*/}
      </BottomSheet>
    </BackgroundLayout>
  );
}
