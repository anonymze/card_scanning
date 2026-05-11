import { BottomSheet, BottomSheetRef } from '@/components/bottom-sheet';
import { CardPreview } from '@/components/card-preview';
import { EmptyState } from '@/components/empty-state';
import { ScrollList } from '@/components/scroll-list';
import { ManaCost } from '@/components/ui/mana-cost';
import { TextInput, TextInputRef } from '@/components/ui/text-inputs';
import { Text } from '@/components/ui/texts';
import { useCardTarget, type CardTargetType } from '@/hooks/use-card-target';
import { listCards, searchCards } from '@/libs/db';
import type { Card } from '@/types/card';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import * as Localization from 'expo-localization';
import React, { Activity } from 'react';
import { StyleSheet, View } from 'react-native';
import { MyTouchableScale } from '@/components/my-pressable';
import { useCSSVariable } from 'uniwind';

const PAGE_SIZE = 50;

function fetchPage(query: string, lang: string, offset: number): Card[] {
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
}: {
  sheetRef: React.RefObject<BottomSheetRef | null>;
  type: CardTargetType;
  id: string;
}) {
  const inputRef = React.useRef<TextInputRef>(null);
  const [search, setSearch] = React.useState('');
  const [results, setResults] = React.useState<Card[]>([]);
  const [hasMore, setHasMore] = React.useState(true);
  const [preview, setPreview] = React.useState<Card | null>(null);
  const loadingRef = React.useRef(false);
  const lang = Localization.getLocales()[0]?.languageCode ?? 'en';

  const target = useCardTarget(type, id);

  const countByOracleId = React.useMemo(() => {
    const m: Record<string, number> = {};
    for (const c of target.cards) m[c.oracleId] = c.quantity;
    return m;
  }, [target.cards]);

  const [common, uncommon, rare, mythic] = useCSSVariable([
    '--color-rarity-common',
    '--color-rarity-uncommon',
    '--color-rarity-rare',
    '--color-rarity-mythic',
  ]);
  const rarityColor: Record<string, string> = {
    common: String(common),
    uncommon: String(uncommon),
    rare: String(rare),
    mythic: String(mythic),
    special: String(rare),
    bonus: String(mythic),
  };

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

  const handleAdd = (card: Card) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    target.addCard(card, 1);
  };

  const handleInc = (card: Card) => target.addCard(card, 1);
  const handleDec = (card: Card) => {
    const entry = target.cards.find((c) => c.oracleId === card.oracle_id);
    if (!entry) return;
    if (entry.quantity <= 1) target.removeCard(entry.id);
    else target.updateQuantity(entry.id, entry.quantity - 1);
  };

  return (
    <BottomSheet
      sheetRef={sheetRef}
      detents={['large']}
      scrollable
      onDidDismiss={() => {
        setSearch('');
        setPreview(null);
        inputRef.current?.clear();
      }}
    >
      <Text className="font-cinzel-semibold text-foreground mb-3 text-2xl">
        Add cards
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
          style={{ flex: 1, marginTop: 8 }}
          data={results}
          extraData={countByOracleId}
          keyExtractor={(item) => item.oracle_id}
          estimatedItemSize={68}
          keyboardShouldPersistTaps="handled"
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          renderItem={({ item }) => {
            const count = countByOracleId[item.oracle_id] ?? 0;
            const color = rarityColor[item.rarity] ?? rarityColor.common;
            const subtitle = [
              item.printed_type_line ?? item.type_line,
              item.set_code.toUpperCase(),
            ]
              .filter(Boolean)
              .join(' · ');
            return (
              <MyTouchableScale
                onPressIn={() => {
                  const uri = item.image_art_crop ?? item.image_normal;
                  if (uri) Image.prefetch(uri);
                }}
                onPress={() => handleAdd(item)}
                onLongPress={() => setPreview(item)}
                className="mb-1.5 flex-row items-center justify-between overflow-hidden rounded-xl px-3 py-3"
              >
                <View
                  pointerEvents="none"
                  style={[
                    StyleSheet.absoluteFill,
                    {
                      experimental_backgroundImage: `linear-gradient(to right, ${color}77 0%, ${color}77 55%, ${color}33 100%)`,
                    },
                  ]}
                />
                <View className="flex-1 pr-3">
                  <View className="flex-row items-center gap-2">
                    <Text
                      className="text-foreground shrink text-base"
                      numberOfLines={1}
                    >
                      {item.printed_name ?? item.name}
                    </Text>
                    {item.mana_cost ? (
                      <ManaCost cost={item.mana_cost} size={19} />
                    ) : null}
                  </View>
                  <Text className="text-gray mt-1 text-sm" numberOfLines={1}>
                    {subtitle}
                  </Text>
                </View>
                {count > 0 ? (
                  <View className="bg-foreground/10 min-w-10 items-center rounded-full px-2.5 py-1">
                    <Text className="text-foreground text-sm font-bold">
                      ×{count}
                    </Text>
                  </View>
                ) : null}
              </MyTouchableScale>
            );
          }}
        />
      </Activity>
      <CardPreview
        card={preview}
        count={preview ? (countByOracleId[preview.oracle_id] ?? 0) : 0}
        onClose={() => setPreview(null)}
        onInc={handleInc}
        onDec={handleDec}
      />
    </BottomSheet>
  );
}
