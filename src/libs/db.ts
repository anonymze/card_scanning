import { open, type DB } from '@op-engineering/op-sqlite';
import { Paths } from 'expo-file-system';
import type { CardSearchRow } from '@/types/db';

const DB_NAME = 'mtg.sqlite';

let db: DB | null = null;

export function openDb(): DB {
  if (!db) {
    const location = Paths.document.uri.replace(/^file:\/\//, '');
    db = open({ name: DB_NAME, location });
  }
  return db;
}

export function logDbStats() {
  const db = openDb();
  const cards = db.executeSync(`SELECT COUNT(*) AS n FROM cards`).rows;
  const printings = db.executeSync(`SELECT COUNT(*) AS n FROM printings`).rows;
  const reps = db.executeSync(
    `SELECT COUNT(*) AS n FROM representative_printings`,
  ).rows;
  const sample = db.executeSync(
    `SELECT oracle_id, name, mana_cost, type_line FROM cards LIMIT 5`,
  ).rows;
  const langs = db.executeSync(
    `SELECT lang, COUNT(*) AS n FROM printings GROUP BY lang`,
  ).rows;

  console.log('[db] cards:', cards?.[0]);
  console.log('[db] printings:', printings?.[0]);
  console.log('[db] reps:', reps?.[0]);
  console.log('[db] langs:', langs);
  console.log('[db] sample cards:');
  for (const row of sample ?? []) console.log('  ', row);
}

export function listCards(
  lang: string,
  limit = 50,
  offset = 0,
): CardSearchRow[] {
  const result = openDb().executeSync(
    `SELECT c.oracle_id,
            COALESCE(p_loc.printed_name, c.name) AS display_name,
            COALESCE(p_loc.printed_type_line, c.type_line) AS display_type,
            c.mana_cost,
            COALESCE(p_loc.image_small, p_en.image_small) AS image_small
       FROM cards c
       JOIN representative_printings rp_en
         ON rp_en.oracle_id = c.oracle_id AND rp_en.lang = 'en'
       JOIN printings p_en ON p_en.id = rp_en.printing_id
       LEFT JOIN representative_printings rp_loc
         ON rp_loc.oracle_id = c.oracle_id AND rp_loc.lang = ?
       LEFT JOIN printings p_loc ON p_loc.id = rp_loc.printing_id
      ORDER BY c.name
      LIMIT ? OFFSET ?`,
    [lang, limit, offset],
  );
  return (result.rows ?? []).map((r) => ({
    oracle_id: String(r.oracle_id),
    display_name: String(r.display_name),
    display_type: r.display_type == null ? null : String(r.display_type),
    mana_cost: r.mana_cost == null ? null : String(r.mana_cost),
    image_small: String(r.image_small),
  }));
}

export function searchCards(
  query: string,
  lang: string,
  limit = 50,
  offset = 0,
): CardSearchRow[] {
  const fts = `${query.trim().replace(/['"]/g, '')}*`;
  const result = openDb().executeSync(
    `SELECT c.oracle_id,
            COALESCE(p_loc.printed_name, c.name) AS display_name,
            COALESCE(p_loc.printed_type_line, c.type_line) AS display_type,
            c.mana_cost,
            COALESCE(p_loc.image_small, p_en.image_small) AS image_small
       FROM cards_fts fts
       JOIN cards c ON c.rowid = fts.rowid
       JOIN representative_printings rp_en
         ON rp_en.oracle_id = c.oracle_id AND rp_en.lang = 'en'
       JOIN printings p_en ON p_en.id = rp_en.printing_id
       LEFT JOIN representative_printings rp_loc
         ON rp_loc.oracle_id = c.oracle_id AND rp_loc.lang = ?
       LEFT JOIN printings p_loc ON p_loc.id = rp_loc.printing_id
      WHERE cards_fts MATCH ?
      ORDER BY c.name
      LIMIT ? OFFSET ?`,
    [lang, fts, limit, offset],
  );
  return (result.rows ?? []).map((r) => ({
    oracle_id: String(r.oracle_id),
    display_name: String(r.display_name),
    display_type: r.display_type == null ? null : String(r.display_type),
    mana_cost: r.mana_cost == null ? null : String(r.mana_cost),
    image_small: String(r.image_small),
  }));
}
