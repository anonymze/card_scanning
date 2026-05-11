import type { Color } from '@/types/card';

export type ManaColorMap = Record<Color | 'C' | 'M', string>;

function singleColor(colors: Color[] | null, manaColor: ManaColorMap): string {
  if (!colors || colors.length === 0) return manaColor.C;
  if (colors.length === 1) return manaColor[colors[0]];
  return manaColor.M;
}

export function buildManaGradientSolid(
  colors: Color[] | null,
  manaColor: ManaColorMap,
  direction: 'to right' | 'to top' = 'to right',
): string {
  const c = singleColor(colors, manaColor);
  return `linear-gradient(${direction}, ${c}88 0%, ${c}88 55%, ${c}44 100%)`;
}

export function buildManaGradientBlend(
  colors: Color[] | null,
  manaColor: ManaColorMap,
  direction: 'to right' | 'to top' = 'to right',
): string {
  const list = colors && colors.length > 0 ? colors : (['C'] as const);
  const stops = list.map((c) => manaColor[c]);
  if (stops.length === 1) {
    const c = stops[0];
    return `linear-gradient(${direction}, ${c}88 0%, ${c}88 55%, ${c}44 100%)`;
  }
  if (stops.length === 2) {
    return `linear-gradient(${direction}, ${stops[0]}88 0%, ${stops[1]}66 55%, ${stops[1]}44 100%)`;
  }
  return `linear-gradient(${direction}, ${stops[0]}88 0%, ${stops[1]}66 50%, ${stops[stops.length - 1]}44 100%)`;
}
