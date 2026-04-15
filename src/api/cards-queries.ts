import { posthog } from '@/libs/posthog';
import type {
  ScryfallSearchParams,
  ScryfallSearchResponse,
} from '@/types/cards';
import { infiniteQueryOptions } from '@tanstack/react-query';
import { fetch } from 'react-native-nitro-fetch';

const SCRYFALL_SEARCH_URL = 'https://api.scryfall.com/cards/search';

async function getCards(
  params: ScryfallSearchParams,
): Promise<ScryfallSearchResponse> {
  const url = new URL(SCRYFALL_SEARCH_URL);
  url.searchParams.set('q', params.q);
  if (params.page) url.searchParams.set('page', String(params.page));
  if (params.unique) url.searchParams.set('unique', params.unique);
  if (params.order) url.searchParams.set('order', params.order);
  if (params.dir) url.searchParams.set('dir', params.dir);
  if (params.format) url.searchParams.set('format', params.format);
  if (params.include_extras) url.searchParams.set('include_extras', 'true');
  if (params.include_multilingual)
    url.searchParams.set('include_multilingual', 'true');
  if (params.include_variations)
    url.searchParams.set('include_variations', 'true');

  const response = await fetch(url.toString(), {
    headers: {
      'User-Agent': 'ArcaneLens/1.0',
      Accept: 'application/json',
    },
  });
  if (!response.ok) throw new Error(`Scryfall error: ${response.status}`);
  return response.json();
}

export const cardsInfiniteQueryOptions = (params: ScryfallSearchParams) =>
  infiniteQueryOptions({
    queryKey: ['cards', 'infinite', params],
    queryFn: ({ pageParam }) => {
      if (pageParam === 1) {
        posthog.capture('card_searched', { query: params.q });
      }
      return getCards({ ...params, page: pageParam });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.has_more ? lastPageParam + 1 : undefined,
  });
