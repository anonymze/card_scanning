// ─── Primitives ───────────────────────────────────────────────────────────────

type Color = 'W' | 'U' | 'B' | 'R' | 'G'
type Colors = Color[]

type Finish = 'foil' | 'nonfoil' | 'etched'
type Game = 'paper' | 'arena' | 'mtgo' | 'astral' | 'sega'
type BorderColor = 'black' | 'white' | 'borderless' | 'yellow' | 'silver' | 'gold'
type ImageStatus = 'missing' | 'placeholder' | 'lowres' | 'highres_scan'
type Rarity = 'common' | 'uncommon' | 'rare' | 'special' | 'mythic' | 'bonus'
type SecurityStamp = 'oval' | 'triangle' | 'acorn' | 'circle' | 'arena' | 'heart'
type Legality = 'legal' | 'not_legal' | 'restricted' | 'banned'
type RelatedComponent = 'token' | 'meld_part' | 'meld_result' | 'combo_piece'

type Layout =
  | 'normal' | 'split' | 'flip' | 'transform' | 'modal_dfc'
  | 'meld' | 'leveler' | 'class' | 'case' | 'saga' | 'adventure'
  | 'mutate' | 'prototype' | 'battle' | 'planar' | 'scheme'
  | 'vanguard' | 'token' | 'double_faced_token' | 'emblem'
  | 'augment' | 'host' | 'art_series' | 'reversible_card'

type SetType =
  | 'core' | 'expansion' | 'draftinnovation' | 'masters' | 'funny'
  | 'commander' | 'duel_deck' | 'from_the_vault' | 'spellbook'
  | 'premium_deck' | 'alchemy' | 'archenemy' | 'masterpiece'
  | 'memorabilia' | 'planechase' | 'promo' | 'starter' | 'token'
  | 'treasure_chest' | 'vanguard'

type Format =
  | 'standard' | 'future' | 'historic' | 'timeless' | 'gladiator'
  | 'pioneer' | 'modern' | 'legacy' | 'pauper' | 'vintage' | 'penny'
  | 'commander' | 'oathbreaker' | 'standardbrawl' | 'brawl' | 'alchemy'
  | 'paupercommander' | 'duel' | 'oldschool' | 'premodern' | 'predh'

// ─── Nested Objects ────────────────────────────────────────────────────────────

interface ImageUris {
  small: string
  normal: string
  large: string
  png: string
  art_crop: string
  border_crop: string
}

interface Prices {
  usd: string | null
  usd_foil: string | null
  usd_etched: string | null
  eur: string | null
  eur_foil: string | null
  eur_etched: string | null
  tix: string | null
}

interface Legalities extends Record<Format, Legality> {}

interface PurchaseUris {
  tcgplayer?: string
  cardmarket?: string
  cardhoarder?: string
}

interface RelatedUris {
  gatherer?: string
  tcgplayer_infinite_articles?: string
  tcgplayer_infinite_decks?: string
  edhrec?: string
}

interface Preview {
  previewed_at: string
  source_uri: string
  source: string
}

interface RelatedCard {
  id: string
  object: 'related_card'
  component: RelatedComponent
  name: string
  type_line: string
  uri: string
}

interface CardFace {
  object: 'card_face'
  name: string
  mana_cost: string
  type_line?: string
  oracle_id?: string
  oracle_text?: string
  colors?: Colors
  color_indicator?: Colors
  power?: string
  toughness?: string
  defense?: string
  loyalty?: string
  artist?: string
  artist_id?: string
  illustration_id?: string
  image_uris?: ImageUris
  flavor_text?: string
  printed_name?: string
  printed_text?: string
  printed_type_line?: string
  watermark?: string
  layout?: string
  cmc?: number
}

// ─── Main Card ─────────────────────────────────────────────────────────────────

export interface ScryfallCard {
  // Core
  object: 'card'
  id: string
  oracle_id?: string
  lang: string
  layout: Layout
  uri: string
  scryfall_uri: string
  prints_search_uri: string
  rulings_uri: string

  // External IDs
  arena_id?: number
  mtgo_id?: number
  mtgo_foil_id?: number
  multiverse_ids?: number[]
  tcgplayer_id?: number
  tcgplayer_etched_id?: number
  cardmarket_id?: number

  // Gameplay
  name: string
  mana_cost?: string
  cmc: number
  type_line: string
  oracle_text?: string
  colors?: Colors
  color_identity: Colors
  color_indicator?: Colors
  keywords: string[]
  legalities: Legalities
  reserved: boolean
  power?: string
  toughness?: string
  defense?: string
  loyalty?: string
  hand_modifier?: string
  life_modifier?: string
  edhrec_rank?: number
  penny_rank?: number
  produced_mana?: Colors
  game_changer?: boolean
  all_parts?: RelatedCard[]
  card_faces?: CardFace[]

  // Print
  set: string
  set_id: string
  set_name: string
  set_type: SetType
  set_uri: string
  set_search_uri: string
  scryfall_set_uri: string
  collector_number: string
  rarity: Rarity
  released_at: string
  reprint: boolean
  variation: boolean
  variation_of?: string
  digital: boolean
  promo: boolean
  promo_types?: string[]
  booster: boolean
  story_spotlight: boolean
  full_art: boolean
  textless: boolean
  oversized: boolean
  finishes: Finish[]
  games: Game[]
  border_color: BorderColor
  frame: string
  frame_effects?: string[]
  security_stamp?: SecurityStamp
  watermark?: string
  highres_image: boolean
  image_status: ImageStatus
  image_uris?: ImageUris
  illustration_id?: string
  card_back_id: string
  artist?: string
  artist_ids?: string[]
  flavor_text?: string
  flavor_name?: string
  attraction_lights?: number[]
  content_warning?: boolean
  prices: Prices
  purchase_uris?: PurchaseUris
  related_uris: RelatedUris
  printed_name?: string
  printed_text?: string
  printed_type_line?: string
  preview?: Preview
}

// ─── Search Response ──────────────────────────────────────────────────────────

export interface ScryfallSearchResponse {
  object: 'list'
  total_cards: number
  has_more: boolean
  next_page?: string
  data: ScryfallCard[]
}

// ─── Search Filters ────────────────────────────────────────────────────────────

type ColorName = 'white' | 'blue' | 'red' | 'black' | 'green'
type ColorShorthand = 'w' | 'u' | 'r' | 'b' | 'g'
type ColorFilter = ColorName | ColorShorthand | 'colorless' | 'multicolor'

type CompareOp = '>' | '<' | '>=' | '<=' | '=' | '!='
type SortOrder =
  | 'artist' | 'cmc' | 'power' | 'toughness' | 'set' | 'name'
  | 'usd' | 'tix' | 'eur' | 'rarity' | 'color' | 'released'
  | 'spoiled' | 'edhrec' | 'penny' | 'review'

type SortDirection = 'asc' | 'desc'
type UniqueStrategy = 'cards' | 'prints' | 'art'

export interface ScryfallSearchParams {
  // Free-text query (Scryfall syntax string)
  q: string

  // Pagination
  page?: number

  // Deduplication strategy
  unique?: UniqueStrategy

  // Sorting
  order?: SortOrder
  dir?: SortDirection

  // Include extras (tokens, art cards, etc.)
  include_extras?: boolean

  // Include multilingual results
  include_multilingual?: boolean

  // Include variations
  include_variations?: boolean

  // Response format
  format?: 'json' | 'csv'
  pretty?: boolean
}

// Query builder helpers (for constructing the `q` string)
export interface ScryfallQueryFilters {
  // Color
  color?: ColorFilter | ColorFilter[]       // c: / color:
  colorIdentity?: ColorFilter | ColorFilter[] // id: / identity:

  // Type
  type?: string                             // t: / type:

  // Text
  oracle?: string                           // o: / oracle:
  keyword?: string                          // kw: / keyword:

  // Mana
  manaValue?: number | `${CompareOp}${number}` // mv: / manavalue:
  manaCost?: string                         // m: / mana:

  // Stats
  power?: number | `${CompareOp}${number}` // pow:
  toughness?: number | `${CompareOp}${number}` // tou:
  loyalty?: number | `${CompareOp}${number}` // loy:

  // Rarity
  rarity?: Rarity                           // r: / rarity:

  // Set
  set?: string                              // s: / e:
  setType?: SetType                         // st:

  // Format legality
  format?: Format                           // f: / format:

  // Price
  priceUsd?: `${CompareOp}${number}`        // usd:
  priceEur?: `${CompareOp}${number}`        // eur:
  priceTix?: `${CompareOp}${number}`        // tix:

  // Artist / Flavor
  artist?: string                           // a: / artist:
  flavorText?: string                       // ft: / flavor:
  watermark?: string                        // wm: / watermark:

  // Border / Frame
  border?: BorderColor                      // border:
  frame?: string                            // frame:

  // Game availability
  game?: Game                               // game:

  // Special flags
  is?: string | string[]                    // is: (reprint, foil, full, etc.)
  not?: string | string[]                   // not:

  // Language
  lang?: string                             // lang: / language:

  // Date
  year?: number | `${CompareOp}${number}`   // year:
  date?: string | `${CompareOp}${string}`   // date:
}
