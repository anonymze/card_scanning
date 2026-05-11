// App-side card type — mirrors a joined row from the R2 SQLite DB
// (cards ⋈ representative_printings ⋈ printings).

export type Rarity =
  | 'common'
  | 'uncommon'
  | 'rare'
  | 'special'
  | 'mythic'
  | 'bonus';

export type Color = 'W' | 'U' | 'B' | 'R' | 'G';

export interface CardFace {
  name: string;
  mana_cost: string;
  type_line?: string;
  oracle_id?: string;
  oracle_text?: string;
  colors?: Color[];
  power?: string;
  toughness?: string;
  defense?: string;
  loyalty?: string;
  artist?: string;
  illustration_id?: string;
  image_uris?: Record<string, string>;
  flavor_text?: string;
  printed_name?: string;
  printed_text?: string;
  printed_type_line?: string;
  cmc?: number;
}

export interface Card {
  // cards
  oracle_id: string;
  name: string;
  mana_cost: string | null;
  cmc: number | null;
  type_line: string | null;
  oracle_text: string | null;
  colors: Color[] | null;
  color_identity: Color[] | null;
  power: string | null;
  toughness: string | null;
  loyalty: string | null;
  keywords: string[] | null;
  legalities: Record<string, string> | null;
  card_faces: CardFace[] | null;

  // representative printing
  printing_id: string;
  lang: string;
  set_code: string;
  set_name: string;
  collector_number: string;
  rarity: Rarity;
  released_at: string;
  artist: string | null;
  image_small: string;
  image_normal: string;
  image_art_crop: string | null;
  printed_name: string | null;
  printed_text: string | null;
  printed_type_line: string | null;
  price_usd: number | null;
  price_eur: number | null;
  price_usd_foil: number | null;
  price_eur_foil: number | null;
  tcgplayer_id: number | null;
  cardmarket_id: number | null;
  illustration_id: string | null;
  phash: string | null;
}
