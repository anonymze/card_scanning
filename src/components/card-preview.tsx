import { CloseIcon } from '@/components/icons';
import { MyTouchableOpacity } from '@/components/my-pressable';
import { ManaCost } from '@/components/ui/mana-cost';
import { Text } from '@/components/ui/texts';
import type { Card } from '@/types/card';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';
import { useCSSVariable } from 'uniwind';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  FadeOutDown,
} from 'react-native-reanimated';

const ENTER_BASE = 40;
const ENTER_STEP = 35;
const enter = (i: number) =>
  FadeInDown.duration(170)
    .delay(ENTER_BASE + i * ENTER_STEP)
    .springify()
    .damping(22)
    .stiffness(230)
    .mass(0.6);

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
  const [bgPrimary] = useCSSVariable(['--color-background-primary']);
  if (!card) return null;
  const description = card.printed_text ?? card.oracle_text;
  return (
    <Animated.View
      entering={FadeIn.duration(100)}
      exiting={FadeOut.duration(100)}
      style={[StyleSheet.absoluteFill, { zIndex: 1000 }]}
      pointerEvents="auto"
    >
      <Pressable
        className="flex-1 items-center justify-center bg-black/70 p-6"
        onPress={onClose}
      >
        <Animated.View
          entering={FadeInDown.duration(200)
            .springify()
            .damping(22)
            .stiffness(230)
            .mass(0.65)}
          exiting={FadeOutDown.duration(120)}
          className="bg-background-primary-darker w-full max-w-sm rounded-2xl p-5"
        >
          <MyTouchableOpacity
            onPress={onClose}
            hitSlop={20}
            className="bg-foreground absolute right-3 top-3 z-10 h-6 w-6 rotate-45 items-center justify-center rounded-md"
          >
            <View className="-rotate-45">
              <CloseIcon color={String(bgPrimary)} size={13} />
            </View>
          </MyTouchableOpacity>
          <Animated.View entering={enter(0)} className="items-center">
            <Image
              source={card.image_art_crop ?? card.image_normal}
              contentFit="cover"
              style={{
                width: '100%',
                aspectRatio: 626 / 457,
                borderRadius: 12,
                marginBottom: 16,
              }}
            />
          </Animated.View>
          <Animated.View
            entering={enter(1)}
            className="flex-row items-center self-stretch"
          >
            <Text className="font-cinzel-semibold text-foreground flex-1 text-xl">
              {card.printed_name ?? card.name}
            </Text>
            {card.mana_cost ? (
              <ManaCost cost={card.mana_cost} size={20} />
            ) : null}
          </Animated.View>
          <Animated.Text
            entering={enter(2)}
            className="text-foreground-darker mt-1 self-stretch text-sm"
          >
            {card.printed_type_line ?? card.type_line ?? ''}
          </Animated.Text>
          {description ? (
            <Animated.Text
              entering={enter(3)}
              className="mt-3 self-stretch text-sm text-white"
            >
              {description}
            </Animated.Text>
          ) : null}
          <Animated.View
            entering={enter(4)}
            onStartShouldSetResponder={() => true}
            className="bg-background-primary mt-5 flex-row items-center justify-between self-stretch rounded-xl p-3"
          >
            <Text className="text-foreground">In your list</Text>
            <View className="flex-row items-center gap-3">
              <MyTouchableOpacity
                onPress={() => onDec(card)}
                className="bg-foreground/10 h-9 w-9 items-center justify-center rounded-full"
              >
                <Text className="text-foreground text-base">−</Text>
              </MyTouchableOpacity>
              <Text className="text-foreground w-7 text-center text-base font-bold">
                {count}
              </Text>
              <MyTouchableOpacity
                onPress={() => onInc(card)}
                className="bg-foreground h-9 w-9 items-center justify-center rounded-full"
              >
                <Text className="text-background-primary text-base">+</Text>
              </MyTouchableOpacity>
            </View>
          </Animated.View>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}
