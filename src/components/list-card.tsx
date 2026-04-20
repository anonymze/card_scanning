import { CardFrame } from '@/components/card-frame';
import { MyTouchableScale } from '@/components/my-pressable';
import { Text } from '@/components/ui/texts';
import type { Collection } from '@/types/collection';
import { router } from 'expo-router';
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

function getTypeBreakdown(item: Collection) {
  const counts: Record<string, number> = {};

  for (const entry of item.cards) {
    const rawType = entry.card.type_line.split('—')[0]?.trim() ?? '';
    const matchedType = CARD_TYPES.find((t) => rawType.includes(t));
    const label = matchedType ?? 'Other';
    counts[label] = (counts[label] ?? 0) + entry.quantity;
  }

  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
}

const PATHNAME = {
  collection: '/collection/[id]',
  deck: '/decks/[id]',
} as const;

export function ListCard({
  item,
  variant,
  onDelete,
  animate = true,
}: {
  item: Collection;
  variant: 'collection' | 'deck';
  onDelete: () => void;
  animate?: boolean;
}) {
  const totalCards = item.cards.reduce((sum, c) => sum + c.quantity, 0);
  const typeBreakdown = getTypeBreakdown(item);

  return (
    <Animated.View
      entering={
        animate
          ? FadeInDown.duration(400).easing(Easing.bezier(0.16, 1, 0.3, 1))
          : undefined
      }
      className="mb-4"
    >
      <MyTouchableScale
        onPress={() =>
          router.push({ pathname: PATHNAME[variant], params: { id: item.id } })
        }
      >
        <CardFrame
          title={item.name}
          onDelete={onDelete}
          variant={variant === 'deck' ? 'deck' : undefined}
        >
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
      </MyTouchableScale>
    </Animated.View>
  );
}
