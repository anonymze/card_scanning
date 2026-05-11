import { View } from 'react-native';

const BG: Record<Rarity, string> = {
  common: 'bg-rarity-common',
  uncommon: 'bg-rarity-uncommon',
  rare: 'bg-rarity-rare',
  mythic: 'bg-rarity-mythic',
};

export type Rarity = 'common' | 'uncommon' | 'rare' | 'mythic';

export function RarityDot({
  rarity,
  size = 8,
}: {
  rarity: Rarity;
  size?: number;
}) {
  return (
    <View
      className={`${BG[rarity]} rounded-full`}
      style={{ width: size, height: size }}
    />
  );
}
