import { createHash } from 'node:crypto';
import { readFileSync, statSync } from 'node:fs';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const SQLITE_FILE = 'data/mtg.sqlite';

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

async function main() {
  const t0 = Date.now();
  const s3 = makeR2();
  const bucket = env('R2_BUCKET');

  const version = new Date().toISOString().replace(/[:.]/g, '-');
  const dbKey = `dbs/mtg-${version}.sqlite`;

  const stats = statSync(SQLITE_FILE);
  console.log(`[upload] ${dbKey} (${(stats.size / 1024 / 1024).toFixed(1)}MB)`);

  const body = readFileSync(SQLITE_FILE);
  const sha256 = createHash('sha256').update(body).digest('hex');
  console.log(`[upload] sha256=${sha256}`);

  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: dbKey,
      Body: body,
      ContentType: 'application/vnd.sqlite3',
    }),
  );
  console.log('[upload] sqlite uploaded');

  const versionPayload = {
    version,
    url: dbKey,
    size: stats.size,
    sha256,
    uploaded_at: new Date().toISOString(),
  };

  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: 'version.json',
      Body: JSON.stringify(versionPayload, null, 2),
      ContentType: 'application/json',
    }),
  );
  console.log('[upload] version.json updated');

  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`[upload] done in ${elapsed}s`);
  console.log(`[upload] payload: ${JSON.stringify(versionPayload, null, 2)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
