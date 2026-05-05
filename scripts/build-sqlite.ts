import { createReadStream, readFileSync, statSync, unlinkSync } from 'node:fs';
import { createInterface } from 'node:readline';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import Database from 'better-sqlite3';

const __dirname = dirname(fileURLToPath(import.meta.url));

const IN_FILE = 'data/cards-with-phash.jsonl';
const OUT_FILE = 'data/mtg.sqlite';
const BATCH = 1000;

function parsePrice(v: string | null | undefined): number | null {
  if (v == null) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function countRows(db: Database.Database, table: string): number {
  const r = db.prepare(`SELECT COUNT(*) AS n FROM ${table}`).get();
  if (r && typeof r === 'object' && 'n' in r && typeof r.n === 'number') {
    return r.n;
  }
  return 0;
}

async function main() {
  const t0 = Date.now();
  try {
    unlinkSync(OUT_FILE);
  } catch {
    // file doesn't exist, ignore
  }

  const db = new Database(OUT_FILE);
  db.pragma('journal_mode = MEMORY');
  db.pragma('synchronous = OFF');
  const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf8');
  db.exec(schema);

  const insertCard = db.prepare(`
    INSERT OR IGNORE INTO cards
      (oracle_id, name, mana_cost, cmc, type_line, oracle_text, colors,
       color_identity, power, toughness, loyalty, keywords, legalities, card_faces)
    VALUES
      (@oracle_id, @name, @mana_cost, @cmc, @type_line, @oracle_text, @colors,
       @color_identity, @power, @toughness, @loyalty, @keywords, @legalities, @card_faces)
  `);

  const insertPrinting = db.prepare(`
    INSERT OR IGNORE INTO printings
      (id, oracle_id, lang, set_code, set_name, collector_number, rarity,
       released_at, artist, image_small, image_normal,
       printed_name, printed_text, printed_type_line,
       price_usd, price_eur, price_usd_foil, price_eur_foil,
       tcgplayer_id, cardmarket_id, illustration_id, phash)
    VALUES
      (@id, @oracle_id, @lang, @set_code, @set_name, @collector_number, @rarity,
       @released_at, @artist, @image_small, @image_normal,
       @printed_name, @printed_text, @printed_type_line,
       @price_usd, @price_eur, @price_usd_foil, @price_eur_foil,
       @tcgplayer_id, @cardmarket_id, @illustration_id, @phash)
  `);

  type CardRow = Parameters<typeof insertCard.run>[0];
  type PrintingRow = Parameters<typeof insertPrinting.run>[0];

  const flushCards = db.transaction((rows: CardRow[]) => {
    for (const r of rows) insertCard.run(r);
  });
  const flushPrintings = db.transaction((rows: PrintingRow[]) => {
    for (const r of rows) insertPrinting.run(r);
  });

  let total = 0;
  let cardBatch: CardRow[] = [];
  let printingBatch: PrintingRow[] = [];

  const rl = createInterface({ input: createReadStream(IN_FILE) });
  for await (const line of rl) {
    total++;
    const c = JSON.parse(line);
    if (!c.oracle_id) continue;

    cardBatch.push({
      oracle_id: c.oracle_id,
      name: c.name,
      mana_cost: c.mana_cost ?? null,
      cmc: c.cmc ?? null,
      type_line: c.type_line ?? null,
      oracle_text: c.oracle_text ?? null,
      colors: c.colors ? JSON.stringify(c.colors) : null,
      color_identity: c.color_identity ? JSON.stringify(c.color_identity) : null,
      power: c.power ?? null,
      toughness: c.toughness ?? null,
      loyalty: c.loyalty ?? null,
      keywords: c.keywords ? JSON.stringify(c.keywords) : null,
      legalities: c.legalities ? JSON.stringify(c.legalities) : null,
      card_faces: c.card_faces ? JSON.stringify(c.card_faces) : null,
    });

    if (c.image_uris?.small && c.image_uris?.normal) {
      printingBatch.push({
        id: c.id,
        oracle_id: c.oracle_id,
        lang: c.lang,
        set_code: c.set,
        set_name: c.set_name,
        collector_number: c.collector_number,
        rarity: c.rarity,
        released_at: c.released_at,
        artist: c.artist ?? null,
        image_small: c.image_uris.small,
        image_normal: c.image_uris.normal,
        printed_name: c.printed_name ?? null,
        printed_text: c.printed_text ?? null,
        printed_type_line: c.printed_type_line ?? null,
        price_usd: parsePrice(c.prices?.usd),
        price_eur: parsePrice(c.prices?.eur),
        price_usd_foil: parsePrice(c.prices?.usd_foil),
        price_eur_foil: parsePrice(c.prices?.eur_foil),
        tcgplayer_id: c.tcgplayer_id ?? null,
        cardmarket_id: c.cardmarket_id ?? null,
        illustration_id: c.illustration_id ?? null,
        phash: c.phash ?? null,
      });
    }

    if (cardBatch.length >= BATCH) {
      flushCards(cardBatch);
      cardBatch = [];
    }
    if (printingBatch.length >= BATCH) {
      flushPrintings(printingBatch);
      printingBatch = [];
    }

    if (total % 50000 === 0) {
      console.log(`[sqlite] processed=${total}`);
    }
  }
  if (cardBatch.length) flushCards(cardBatch);
  if (printingBatch.length) flushPrintings(printingBatch);

  const cardsCount = countRows(db, 'cards');
  const printingsCount = countRows(db, 'printings');
  console.log(`[sqlite] inserted: cards=${cardsCount} printings=${printingsCount}`);

  console.log('[sqlite] computing representative_printings...');
  db.exec(`
    INSERT INTO representative_printings (oracle_id, lang, printing_id)
    SELECT oracle_id, lang, id FROM (
      SELECT oracle_id, lang, id,
        ROW_NUMBER() OVER (
          PARTITION BY oracle_id, lang
          ORDER BY released_at DESC, id DESC
        ) AS rn
      FROM printings
      WHERE lang = 'en'
         OR (lang = 'fr' AND printed_name IS NOT NULL)
    ) WHERE rn = 1;
  `);
  const repCount = countRows(db, 'representative_printings');
  console.log(`[sqlite] representative_printings=${repCount}`);

  db.exec('VACUUM');
  db.close();

  const sizeBytes = statSync(OUT_FILE).size;
  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(
    `[sqlite] done. size=${(sizeBytes / 1024 / 1024).toFixed(1)}MB elapsed=${elapsed}s`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
