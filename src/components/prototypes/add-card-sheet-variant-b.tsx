// PROTOTYPE — Variant B: row bg = experimental native linear gradient
// Throwaway code. Uses RN 0.76+ `experimental_backgroundImage` style.

import { BottomSheet, BottomSheetRef } from '@/components/bottom-sheet';
import { ScrollList } from '@/components/scroll-list';
import { ManaCost } from '@/components/ui/mana-cost';
import { Rarity } from '@/components/ui/rarity-dot';
import { TextInput, TextInputRef } from '@/components/ui/text-inputs';
import { Text } from '@/components/ui/texts';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useCSSVariable } from 'uniwind';
import { CardPreviewModal } from './card-preview-modal';
import { MOCK_CARDS, MockCard } from './mock-cards';

export function AddCardSheetVariantB({
  sheetRef,
}: {
  sheetRef: React.RefObject<BottomSheetRef | null>;
  type: 'collection' | 'deck';
  id: string;
}) {
  const inputRef = React.useRef<TextInputRef>(null);
  const [search, setSearch] = React.useState('');
  const [counts, setCounts] = React.useState<Record<string, number>>(() =>
    Object.fromEntries(MOCK_CARDS.map((c) => [c.oracle_id, c.count])),
  );
  const [preview, setPreview] = React.useState<MockCard | null>(null);

  const [common, uncommon, rare, mythic] = useCSSVariable([
    '--color-rarity-common',
    '--color-rarity-uncommon',
    '--color-rarity-rare',
    '--color-rarity-mythic',
  ]);
  const rarityColor: Record<Rarity, string> = {
    common: String(common),
    uncommon: String(uncommon),
    rare: String(rare),
    mythic: String(mythic),
  };

  const filtered = MOCK_CARDS.filter((c) =>
    c.name.toLowerCase().includes(search.trim().toLowerCase()),
  );

  const increment = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCounts((p) => ({ ...p, [id]: (p[id] ?? 0) + 1 }));
  };

  return (
    <>
      <BottomSheet sheetRef={sheetRef} detents={['large']} scrollable>
        <Text className="font-cinzel-semibold text-foreground mb-3 text-2xl">
          Add cards
        </Text>
        <TextInput
          ref={inputRef}
          placeholder="Search cards..."
          onChangeText={setSearch}
        />
        <ScrollList
          style={{ flex: 1, marginTop: 8 }}
          data={filtered}
          keyExtractor={(item) => item.oracle_id}
          estimatedItemSize={68}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => {
            const count = counts[item.oracle_id] ?? 0;
            const color = rarityColor[item.rarity];
            return (
              <Pressable
                onPressIn={() => console.log('[B] onPressIn', item.name)}
                onPressOut={() => console.log('[B] onPressOut', item.name)}
                onPress={() => {
                  console.log('[B] onPress', item.name);
                  increment(item.oracle_id);
                }}
                onLongPress={() => {
                  console.log('[B] onLongPress', item.name);
                  setPreview(item);
                }}
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
                      {item.name}
                    </Text>
                    <ManaCost cost={item.mana_cost} size={19} />
                  </View>
                  <Text className="text-gray mt-1 text-sm" numberOfLines={1}>
                    {item.type_line} · {item.set_code}
                  </Text>
                </View>
                {count > 0 ? (
                  <View className="bg-foreground/10 min-w-10 items-center rounded-full px-2.5 py-1">
                    <Text className="text-foreground text-sm font-bold">
                      ×{count}
                    </Text>
                  </View>
                ) : null}
              </Pressable>
            );
          }}
          />
        <CardPreviewModal
          card={preview}
          count={preview ? (counts[preview.oracle_id] ?? 0) : 0}
          onClose={() => setPreview(null)}
          onInc={(id) => setCounts((p) => ({ ...p, [id]: (p[id] ?? 0) + 1 }))}
          onDec={(id) =>
            setCounts((p) => ({ ...p, [id]: Math.max(0, (p[id] ?? 0) - 1) }))
          }
        />
      </BottomSheet>
    </>
  );
}
