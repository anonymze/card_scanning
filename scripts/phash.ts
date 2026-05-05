import { createReadStream, createWriteStream } from 'node:fs';
import { createInterface } from 'node:readline';
import { Buffer } from 'node:buffer';
import phash from 'sharp-phash';
import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const IN_FILE = 'data/cards.jsonl';
const OUT_FILE = 'data/cards-with-phash.jsonl';
const CACHE_KEY = 'cache/phashes.json';
const CONCURRENCY = 20;

function env(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`missing env ${name}`);
  return v;
}

function makeR2(): S3Client {
  return new S3Client({
    region: 'auto',
    endpoint: `https://${env('R2_ACCOUNT_ID')}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: env('R2_ACCESS_KEY_ID'),
      secretAccessKey: env('R2_SECRET_ACCESS_KEY'),
    },
  });
}

async function loadCache(s3: S3Client): Promise<Record<string, string>> {
  try {
    const obj = await s3.send(
      new GetObjectCommand({ Bucket: env('R2_BUCKET'), Key: CACHE_KEY }),
    );
    const body = obj.Body;
    if (!body) return {};
    const text = await body.transformToString();
    const parsed: Record<string, string> = JSON.parse(text);
    return parsed;
  } catch (err) {
    if (err instanceof Error && err.name === 'NoSuchKey') {
      console.log('[phash] no existing cache, starting fresh');
      return {};
    }
    throw err;
  }
}

async function saveCache(s3: S3Client, cache: Record<string, string>) {
  await s3.send(
    new PutObjectCommand({
      Bucket: env('R2_BUCKET'),
      Key: CACHE_KEY,
      Body: JSON.stringify(cache),
      ContentType: 'application/json',
    }),
  );
}

async function computePhash(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'card-scanning-builder/1.0' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  return await phash(buf);
}

async function main() {
  const t0 = Date.now();
  const s3 = makeR2();
  const cache = await loadCache(s3);
  console.log(`[phash] cache loaded: ${Object.keys(cache).length} existing entries`);

  // Pass 1: collect unique illustration_ids missing from cache
  const missing = new Map<string, string>();
  let total = 0;
  {
    const rl = createInterface({ input: createReadStream(IN_FILE) });
    for await (const line of rl) {
      total++;
      const card = JSON.parse(line);
      const illId: string | undefined = card.illustration_id;
      const url: string | undefined = card.image_uris?.normal;
      if (!illId || !url) continue;
      if (cache[illId]) continue;
      if (missing.has(illId)) continue;
      missing.set(illId, url);
    }
  }
  console.log(`[phash] total cards: ${total}, unique illustrations missing: ${missing.size}`);

  // Compute missing phashes concurrently in batches
  const entries = Array.from(missing.entries());
  let computed = 0;
  let failed = 0;

  for (let i = 0; i < entries.length; i += CONCURRENCY) {
    const batch = entries.slice(i, i + CONCURRENCY);
    await Promise.all(
      batch.map(async ([illId, url]) => {
        try {
          const hash = await computePhash(url);
          cache[illId] = hash;
          computed++;
        } catch (err) {
          failed++;
          const msg = err instanceof Error ? err.message : String(err);
          console.warn(`[phash] fail ${illId}: ${msg}`);
        }
      }),
    );
    if ((i / CONCURRENCY) % 25 === 0) {
      console.log(`[phash] progress ${i + batch.length}/${entries.length} (computed=${computed} failed=${failed})`);
    }
  }
  console.log(`[phash] computed=${computed} failed=${failed}`);

  // Save cache to R2
  await saveCache(s3, cache);
  console.log('[phash] cache uploaded to R2');

  // Pass 2: write augmented JSONL
  const out = createWriteStream(OUT_FILE);
  let written = 0;
  let withPhash = 0;
  {
    const rl = createInterface({ input: createReadStream(IN_FILE) });
    for await (const line of rl) {
      const card = JSON.parse(line);
      const illId: string | undefined = card.illustration_id;
      if (illId && cache[illId]) {
        card.phash = cache[illId];
        withPhash++;
      }
      out.write(JSON.stringify(card) + '\n');
      written++;
    }
  }
  await new Promise<void>((resolve, reject) => {
    out.end(() => resolve());
    out.on('error', reject);
  });

  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`[phash] done. wrote ${written} cards (${withPhash} with phash) in ${elapsed}s`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
