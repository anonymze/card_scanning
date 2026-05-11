import { Text } from '@/components/ui/texts';
import { View } from 'react-native';

const GLYPH: Record<string, string> = {
  W: '\uE600',
  U: '\uE601',
  B: '\uE602',
  R: '\uE603',
  G: '\uE604',
  C: '\uE904',
  '0': '\uE605',
  '1': '\uE606',
  '2': '\uE607',
  '3': '\uE608',
  '4': '\uE609',
  '5': '\uE60A',
  '6': '\uE60B',
  '7': '\uE60C',
  '8': '\uE60D',
  '9': '\uE60E',
  '10': '\uE60F',
  '11': '\uE610',
  '12': '\uE611',
  '13': '\uE612',
  '14': '\uE613',
  '15': '\uE614',
  X: '\uE615',
  Y: '\uE616',
  Z: '\uE617',
  T: '\uE61A',
  Q: '\uE61E',
  E: '\uE61F',
  S: '\uE619',
  P: '\uE618',
};

const BG: Record<string, string> = {
  W: 'bg-mana-w',
  U: 'bg-mana-u',
  B: 'bg-mana-b',
  R: 'bg-mana-r',
  G: 'bg-mana-g',
  C: 'bg-mana-c',
};

function isNumeric(token: string): boolean {
  return /^\d+$/.test(token);
}

function parseManaCost(cost: string | null | undefined): string[] {
  if (!cost) return [];
  return (cost.match(/\{([^}]+)\}/g) ?? []).map((m) => m.slice(1, -1));
}

export function ManaSymbol({
  token,
  size = 16,
}: {
  token: string;
  size?: number;
}) {
  const key = token.toUpperCase();
  const glyph = GLYPH[key] ?? '?';
  const bg = isNumeric(key) ? 'bg-mana-c' : (BG[key] ?? 'bg-mana-c');

  return (
    <View
      className={`${bg} items-center justify-center rounded-full`}
      style={{ width: size, height: size }}
    >
      <Text
        className="font-mana text-rarity-common"
        style={{ fontSize: size * 0.78, lineHeight: size }}
      >
        {glyph}
      </Text>
    </View>
  );
}

export function ManaCost({
  cost,
  size = 16,
  className,
}: {
  cost: string | null | undefined;
  size?: number;
  className?: string;
}) {
  const tokens = parseManaCost(cost);
  if (!tokens.length) return null;
  return (
    <View
      className={`flex-row items-center ${className ?? ''}`}
      style={{ gap: 2 }}
    >
      {tokens.map((t, i) => (
        <ManaSymbol key={`${t}-${i}`} token={t} size={size} />
      ))}
    </View>
  );
}
