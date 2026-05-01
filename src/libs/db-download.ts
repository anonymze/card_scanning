import { storage } from '@/libs/mmkv';
import type { DbVersion } from '@/types/db';
import { File, Paths } from 'expo-file-system';

const DB_NAME = 'mtg.sqlite';
const VERSION_KEY = 'db_version';
const CDN = process.env.EXPO_PUBLIC_CDN_BUCKET;
const KEY = process.env.EXPO_PUBLIC_CDN_BUCKET_APP_KEY;

export async function ensureDbDownloaded(version: DbVersion): Promise<void> {
  const dbFile = new File(Paths.document, DB_NAME);
  const localVersion = storage.getString(VERSION_KEY);

  if (localVersion === version.version && dbFile.exists) return;

  if (dbFile.exists) dbFile.delete();

  const url = `${CDN}/${version.url}`;
  await File.downloadFileAsync(url, dbFile, {
    headers: { 'X-App-Key': KEY ?? '' },
  });

  storage.set(VERSION_KEY, version.version);
}
