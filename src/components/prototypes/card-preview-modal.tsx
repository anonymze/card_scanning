// PROTOTYPE — shared modal preview used by all variants
import { ManaCost } from '@/components/ui/mana-cost';
import { Text } from '@/components/ui/texts';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { MockCard } from './mock-cards';

export function CardPreviewModal({
  card,
  count,
  onClose,
  onInc,
  onDec,
}: {
  card: MockCard | null;
  count: number;
  onClose: () => void;
  onInc: (id: string) => void;
  onDec: (id: string) => void;
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
        {card ? (
          <Pressable className="bg-background-primary-darker w-full max-w-sm items-center rounded-2xl p-5">
            <Image
              source={{ uri: card.image_normal }}
              style={{
                width: 220,
                height: 308,
                borderRadius: 12,
                marginBottom: 16,
              }}
            />
            <View className="flex-row items-center self-stretch">
              <Text className="font-cinzel-semibold text-foreground flex-1 text-xl">
                {card.name}
              </Text>
              <ManaCost cost={card.mana_cost} size={18} />
            </View>
            <Text className="text-foreground-darker mt-1 self-stretch text-sm">
              {card.type_line}
            </Text>
            <Text className="text-foreground mt-3 self-stretch text-sm">
              {card.oracle_text}
            </Text>
            <Text className="text-gray mt-3 self-stretch text-xs">
              {card.set_name} · {card.rarity} · {card.collector_number}
            </Text>
            <View className="bg-background-primary mt-5 flex-row items-center justify-between self-stretch rounded-xl p-3">
              <Text className="text-foreground">In your collection</Text>
              <View className="flex-row items-center gap-3">
                <Pressable
                  onPress={() => onDec(card.oracle_id)}
                  className="bg-foreground/10 h-9 w-9 items-center justify-center rounded-full"
                >
                  <Text className="text-foreground text-xl">−</Text>
                </Pressable>
                <Text className="text-foreground w-8 text-center text-lg font-bold">
                  {count}
                </Text>
                <Pressable
                  onPress={() => onInc(card.oracle_id)}
                  className="bg-foreground h-9 w-9 items-center justify-center rounded-full"
                >
                  <Text className="text-background-primary text-xl">+</Text>
                </Pressable>
              </View>
            </View>
          </Pressable>
        ) : null}
      </Pressable>
    </View>
  );
}
