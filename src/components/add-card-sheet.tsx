import { BottomSheet, BottomSheetRef } from '@/components/bottom-sheet';
import { EmptyState } from '@/components/empty-state';
import { ScrollList } from '@/components/scroll-list';
import { TextInput, TextInputRef } from '@/components/ui/text-inputs';
import { Text } from '@/components/ui/texts';
import { listCards, searchCards } from '@/libs/db';
import type { CardSearchRow } from '@/types/db';
import * as Localization from 'expo-localization';
import React, { Activity } from 'react';
import { Pressable, View } from 'react-native';

const PAGE_SIZE = 50;

function fetchPage(
  query: string,
  lang: string,
  offset: number,
): CardSearchRow[] {
  const q = query.trim();
  try {
    return q.length < 2
      ? listCards(lang, PAGE_SIZE, offset)
      : searchCards(q, lang, PAGE_SIZE, offset);
  } catch (err) {
    console.warn('search failed', err);
    return [];
  }
}

export function AddCardSheet({
  sheetRef,
  type,
  id,
  onPick,
}: {
  sheetRef: React.RefObject<BottomSheetRef | null>;
  type: 'collection' | 'deck';
  id: string;
  onPick?: (oracleId: string) => void;
}) {
  const inputRef = React.useRef<TextInputRef>(null);
  const [search, setSearch] = React.useState('');
  const [results, setResults] = React.useState<CardSearchRow[]>([]);
  const [hasMore, setHasMore] = React.useState(true);
  const loadingRef = React.useRef(false);
  const lang = Localization.getLocales()[0]?.languageCode ?? 'en';

  React.useEffect(() => {
    const page = fetchPage(search, lang, 0);
    setResults(page);
    setHasMore(page.length === PAGE_SIZE);
  }, [search, lang]);

  const loadMore = React.useCallback(() => {
    if (loadingRef.current || !hasMore) return;
    loadingRef.current = true;
    const next = fetchPage(search, lang, results.length);
    if (next.length > 0) setResults((prev) => [...prev, ...next]);
    if (next.length < PAGE_SIZE) setHasMore(false);
    loadingRef.current = false;
  }, [search, lang, results.length, hasMore]);

  const handlePick = (oracleId: string) => {
    onPick?.(oracleId);
    console.log('add', { type, id, oracle_id: oracleId });
    sheetRef.current?.dismiss();
  };

  return (
    <BottomSheet
      sheetRef={sheetRef}
      detents={['large']}
      scrollable
      onDidDismiss={() => {
        setSearch('');
        inputRef.current?.clear();
      }}
    >
      <Text className="font-cinzel-semibold text-foreground mb-4 text-2xl">
        Add a card
      </Text>
      <TextInput
        ref={inputRef}
        placeholder="Search cards..."
        onChangeText={setSearch}
      />
      {results.length === 0 ? (
        <EmptyState
          size={200}
          variant="search"
          className="flex-none items-center pt-12"
          title="No cards found"
          subtitle="Try a different search term"
        />
      ) : null}
      <Activity mode={results.length === 0 ? 'hidden' : 'visible'}>
        <ScrollList
          data={results}
          keyExtractor={(item) => item.oracle_id}
          estimatedItemSize={56}
          keyboardShouldPersistTaps="handled"
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => handlePick(item.oracle_id)}
              className="border-foreground-darker/20 flex-row items-center justify-between border-b py-3"
            >
              <View className="flex-1">
                <Text className="text-foreground" numberOfLines={1}>
                  {item.display_name}
                </Text>
                {item.display_type ? (
                  <Text className="text-gray text-xs" numberOfLines={1}>
                    {item.display_type}
                  </Text>
                ) : null}
              </View>
              {item.mana_cost ? (
                <Text className="text-foreground-darker font-sans-semibold ml-3 text-sm">
                  {item.mana_cost}
                </Text>
              ) : null}
            </Pressable>
          )}
        />
      </Activity>
    </BottomSheet>
  );
}
