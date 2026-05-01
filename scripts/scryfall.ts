import { createWriteStream } from 'node:fs';
import { mkdir, stat } from 'node:fs/promises';
import { Readable } from 'node:stream';
import Parser from 'stream-json/Parser.js';
import StreamArray from 'stream-json/streamers/StreamArray.js';

const BULK_API = 'https://api.scryfall.com/bulk-data';
const OUT_DIR = 'data';
const OUT_FILE = `${OUT_DIR}/cards.jsonl`;

const FIELDS_TO_DROP = new Set([
  'arena_id',
  'mtgo_id',
  'mtgo_foil_id',
  'multiverse_ids',
  'prints_search_uri',
  'rulings_uri',
  'scryfall_set_uri',
  'scryfall_uri',
  'set_search_uri',
  'set_uri',
  'uri',
  'highres_image',
  'image_status',
  'printed_size',
  'card_back_id',
  'artist_ids',
  'preview',
  'story_spotlight',
  'full_art',
  'textless',
  'booster',
  'content_warnings',
  'attraction_lights',
  'life_modifier',
  'hand_modifier',
  'variation',
  'variation_of',
  'reserved',
  'security_stamp',
  'watermark',
]);

const IMAGE_URIS_TO_DROP = new Set(['png', 'art_crop', 'border_crop']);

async function getBulkUrl(): Promise<{ url: string; updated_at: string; size: number }> {
  const res = await fetch(BULK_API, {
    headers: { 'User-Agent': 'card-scanning/1.0', Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`bulk-data api: ${res.status}`);

  const json = await res.json();
  if (typeof json !== 'object' || json === null || !('data' in json) || !Array.isArray(json.data)) {
    throw new Error('invalid bulk-data response');
  }

  for (const item of json.data) {
    if (
      typeof item === 'object' &&
      item !== null &&
      'type' in item &&
      item.type === 'all_cards' &&
      'download_uri' in item &&
      typeof item.download_uri === 'string' &&
      'updated_at' in item &&
      typeof item.updated_at === 'string' &&
      'size' in item &&
      typeof item.size === 'number'
    ) {
      return { url: item.download_uri, updated_at: item.updated_at, size: item.size };
    }
  }
  throw new Error('all_cards bulk not found');
}

function trimCard(card: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(card)) {
    if (FIELDS_TO_DROP.has(key)) continue;
    if (key === 'image_uris' && typeof value === 'object' && value !== null) {
      const trimmed: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(value)) {
        if (!IMAGE_URIS_TO_DROP.has(k)) trimmed[k] = v;
      }
      out[key] = trimmed;
      continue;
    }
    out[key] = value;
  }
  return out;
}

function isKeptCard(card: unknown): card is Record<string, unknown> {
  if (typeof card !== 'object' || card === null) return false;
  const lang = (card as Record<string, unknown>).lang;
  return lang === 'en' || lang === 'fr';
}

async function main() {
  const t0 = Date.now();
  console.log('[scryfall] fetching bulk-data metadata…');
  const bulk = await getBulkUrl();
  console.log(`[scryfall] bulk all_cards updated_at=${bulk.updated_at} size=${(bulk.size / 1024 / 1024).toFixed(0)}MB`);

  await mkdir(OUT_DIR, { recursive: true });

  console.log(`[scryfall] downloading + filtering → ${OUT_FILE}`);
  const res = await fetch(bulk.url, { headers: { 'User-Agent': 'card-scanning/1.0' } });
  if (!res.ok || !res.body) throw new Error(`download bulk: ${res.status}`);

  const out = createWriteStream(OUT_FILE);
  const stream = Readable.fromWeb(res.body).pipe(new Parser()).pipe(new StreamArray());

  let total = 0;
  let kept = 0;
  let langCounts: Record<string, number> = {};

  for await (const { value } of stream) {
    total++;
    if (typeof value !== 'object' || value === null || !('lang' in value)) continue;

    const lang = (value as Record<string, unknown>).lang;
    if (typeof lang === 'string') {
      langCounts[lang] = (langCounts[lang] ?? 0) + 1;
    }

    if (!isKeptCard(value)) continue;

    const trimmed = trimCard(value);
    out.write(JSON.stringify(trimmed) + '\n');
    kept++;

    if (total % 50000 === 0) {
      console.log(`[scryfall] processed=${total} kept=${kept}`);
    }
  }

  await new Promise<void>((resolve, reject) => {
    out.end(() => resolve());
    out.on('error', reject);
  });

  const stats = await stat(OUT_FILE);
  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);

  console.log('[scryfall] done.');
  console.log(`  total processed: ${total}`);
  console.log(`  kept (en+fr):    ${kept}`);
  console.log(`  output size:     ${(stats.size / 1024 / 1024).toFixed(1)} MB`);
  console.log(`  elapsed:         ${elapsed}s`);
  console.log('  langs in source:');
  for (const [lang, n] of Object.entries(langCounts).sort((a, b) => b[1] - a[1])) {
    console.log(`    ${lang}: ${n}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
