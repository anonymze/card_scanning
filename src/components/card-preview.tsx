import { ManaCost } from '@/components/ui/mana-cost';
import { Text } from '@/components/ui/texts';
import type { Card } from '@/types/card';
import { Image, Pressable, StyleSheet, View } from 'react-native';

export function CardPreview({
  card,
  count,
  onClose,
  onInc,
  onDec,
}: {
  card: Card | null;
  count: number;
  onClose: () => void;
  onInc: (card: Card) => void;
  onDec: (card: Card) => void;
}) {
  if (!card) return null;
  return (
    <View
      style={[StyleSheet.absoluteFill, { zIndex: 1000 }]}
      pointerEvents="auto"
    >
      <Pressable
        className="flex-1 items-center justify-center bg-black/70 p-6"
        onPress={onClose}
      >
        <Pressable className="bg-background-primary-darker w-full max-w-sm rounded-2xl p-5">
          <Pressable
            onPress={onClose}
            hitSlop={12}
            className="absolute right-3 top-3 z-10 h-8 w-8 items-center justify-center rounded-full bg-foreground/10"
          >
            <Text className="text-foreground text-lg">×</Text>
          </Pressable>
          <View className="items-center">
            <Image
              source={{ uri: card.image_art_crop ?? card.image_normal }}
              style={{
                width: 260,
                height: 190,
                borderRadius: 12,
                marginBottom: 16,
              }}
            />
          </View>
          <View className="flex-row items-center self-stretch">
            <Text className="font-cinzel-semibold text-foreground flex-1 text-xl">
              {card.printed_name ?? card.name}
            </Text>
            {card.mana_cost ? (
              <ManaCost cost={card.mana_cost} size={20} />
            ) : null}
          </View>
          <Text className="text-foreground-darker mt-1 self-stretch text-sm">
            {card.printed_type_line ?? card.type_line ?? ''}
          </Text>
          {card.printed_text ?? card.oracle_text ? (
            <Text className="mt-3 self-stretch text-sm text-white">
              {card.printed_text ?? card.oracle_text}
            </Text>
          ) : null}
          <View className="bg-background-primary mt-5 flex-row items-center justify-between self-stretch rounded-xl p-3">
            <Text className="text-foreground">In your list</Text>
            <View className="flex-row items-center gap-3">
              <Pressable
                onPress={() => onDec(card)}
                className="bg-foreground/10 h-9 w-9 items-center justify-center rounded-full"
              >
                <Text className="text-foreground text-xl">−</Text>
              </Pressable>
              <Text className="text-foreground w-8 text-center text-lg font-bold">
                {count}
              </Text>
              <Pressable
                onPress={() => onInc(card)}
                className="bg-foreground h-9 w-9 items-center justify-center rounded-full"
              >
                <Text className="text-background-primary text-xl">+</Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Pressable>
    </View>
  );
}
