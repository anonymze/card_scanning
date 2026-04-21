import { DbVersion } from '@/types/db';
import { queryOptions } from '@tanstack/react-query';
import { fetch, prefetchOnAppStart } from 'react-native-nitro-fetch';

const CDN = process.env.EXPO_PUBLIC_CDN_BUCKET;
const KEY = process.env.EXPO_PUBLIC_CDN_BUCKET_APP_KEY;
const PREFETCH_KEY = 'version-json';

prefetchOnAppStart(`${CDN}/version.json`, {
  prefetchKey: PREFETCH_KEY,
  headers: { 'X-App-Key': KEY ?? '' },
}).catch(() => {});

export async function getDbVersion(): Promise<DbVersion> {
  const res = await fetch(`${CDN}/version.json`, {
    headers: {
      'X-App-Key': KEY ?? '',
      prefetchKey: PREFETCH_KEY,
    },
  });
  if (!res.ok) throw new Error(`version.json: ${res.status}`);
  return res.json();
}

export const dbVersionQueryOptions = () =>
  queryOptions({
    queryKey: ['db-version'],
    queryFn: getDbVersion,
    staleTime: 60 * 1000, // 1 min
  });
