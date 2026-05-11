import { open, type DB } from '@op-engineering/op-sqlite';
import { Paths } from 'expo-file-system';
import type { Card, CardFace, Color } from '@/types/card';

const DB_NAME = 'mtg.sqlite';

let db: DB | null = null;

export function openDb(): DB {
  if (!db) {
    const location = Paths.document.uri.replace(/^file:\/\//, '');
    db = open({ name: DB_NAME, location });
  }
  return db;
}

const SELECT_CARD = `
  SELECT c.oracle_id, c.name, c.mana_cost, c.cmc, c.type_line, c.oracle_text,
         c.colors, c.color_identity, c.power, c.toughness, c.loyalty,
         c.keywords, c.legalities, c.card_faces,
         p.id AS printing_id, p.lang, p.set_code, p.set_name,
         p.collector_number, p.rarity, p.released_at, p.artist,
         p.image_small, p.image_normal, p.image_art_crop,
         p.printed_name, p.printed_text, p.printed_type_line,
         p.price_usd, p.price_eur, p.price_usd_foil, p.price_eur_foil,
         p.tcgplayer_id, p.cardmarket_id, p.illustration_id, p.phash
    FROM cards c
    JOIN representative_printings rp
      ON rp.oracle_id = c.oracle_id
     AND rp.lang = COALESCE(
       (SELECT lang FROM representative_printings
         WHERE oracle_id = c.oracle_id AND lang = ?),
       'en'
     )
    JOIN printings p ON p.id = rp.printing_id
`;

function parseJsonField<T>(value: unknown): T | null {
  if (value == null) return null;
  if (typeof value !== 'string') return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function toNumber(value: unknown): number | null {
  if (value == null) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function toString(value: unknown): string {
  return value == null ? '' : String(value);
}

function toNullableString(value: unknown): string | null {
  return value == null ? null : String(value);
}

function rowToCard(r: Record<string, unknown>): Card {
  return {
    oracle_id: toString(r.oracle_id),
    name: toString(r.name),
    mana_cost: toNullableString(r.mana_cost),
    cmc: toNumber(r.cmc),
    type_line: toNullableString(r.type_line),
    oracle_text: toNullableString(r.oracle_text),
    colors: parseJsonField<Color[]>(r.colors),
    color_identity: parseJsonField<Color[]>(r.color_identity),
    power: toNullableString(r.power),
    toughness: toNullableString(r.toughness),
    loyalty: toNullableString(r.loyalty),
    keywords: parseJsonField<string[]>(r.keywords),
    legalities: parseJsonField<Record<string, string>>(r.legalities),
    card_faces: parseJsonField<CardFace[]>(r.card_faces),
    printing_id: toString(r.printing_id),
    lang: toString(r.lang),
    set_code: toString(r.set_code),
    set_name: toString(r.set_name),
    collector_number: toString(r.collector_number),
    rarity: toString(r.rarity) as Card['rarity'],
    released_at: toString(r.released_at),
    artist: toNullableString(r.artist),
    image_small: toString(r.image_small),
    image_normal: toString(r.image_normal),
    image_art_crop: toNullableString(r.image_art_crop),
    printed_name: toNullableString(r.printed_name),
    printed_text: toNullableString(r.printed_text),
    printed_type_line: toNullableString(r.printed_type_line),
    price_usd: toNumber(r.price_usd),
    price_eur: toNumber(r.price_eur),
    price_usd_foil: toNumber(r.price_usd_foil),
    price_eur_foil: toNumber(r.price_eur_foil),
    tcgplayer_id: toNumber(r.tcgplayer_id),
    cardmarket_id: toNumber(r.cardmarket_id),
    illustration_id: toNullableString(r.illustration_id),
    phash: toNullableString(r.phash),
  };
}

export function logDbStats() {
  const db = openDb();
  const cards = db.executeSync(`SELECT COUNT(*) AS n FROM cards`).rows;
  const printings = db.executeSync(`SELECT COUNT(*) AS n FROM printings`).rows;
  const reps = db.executeSync(
    `SELECT COUNT(*) AS n FROM representative_printings`,
  ).rows;
  const langs = db.executeSync(
    `SELECT lang, COUNT(*) AS n FROM printings GROUP BY lang`,
  ).rows;
  console.log('[db] cards:', cards?.[0]);
  console.log('[db] printings:', printings?.[0]);
  console.log('[db] reps:', reps?.[0]);
  console.log('[db] langs:', langs);
}

export function listCards(lang: string, limit = 50, offset = 0): Card[] {
  const result = openDb().executeSync(
    `${SELECT_CARD} ORDER BY c.name LIMIT ? OFFSET ?`,
    [lang, limit, offset],
  );
  return (result.rows ?? []).map((r: Record<string, unknown>) => rowToCard(r));
}

export function searchCards(
  query: string,
  lang: string,
  limit = 50,
  offset = 0,
): Card[] {
  const fts = `${query.trim().replace(/['"]/g, '')}*`;
  const result = openDb().executeSync(
    `${SELECT_CARD.replace('FROM cards c', 'FROM cards_fts fts JOIN cards c ON c.rowid = fts.rowid')}
      WHERE cards_fts MATCH ?
      ORDER BY c.name LIMIT ? OFFSET ?`,
    [lang, fts, limit, offset],
  );
  return (result.rows ?? []).map((r: Record<string, unknown>) => rowToCard(r));
}

export function getCardByOracleId(oracleId: string, lang: string): Card | null {
  const result = openDb().executeSync(
    `${SELECT_CARD} WHERE c.oracle_id = ? LIMIT 1`,
    [lang, oracleId],
  );
  const row = result.rows?.[0];
  return row ? rowToCard(row as Record<string, unknown>) : null;
}
