import { cardsInfiniteQueryOptions } from '@/api/queries/cards-queries';
import { storage } from '@/libs/mmkv';
import { persistQueryClient } from '@tanstack/query-persist-client-core';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  // queryCache: new QueryCache({
  // 	onError: errorHandler,
  // }),
  // mutationCache: new MutationCache({
  // 	onError: errorHandler,
  // }),

  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 60 * 60 * 1000, // 1h
      gcTime: 60 * 240 * 1000, // 4h
    },
  },
});

// Prefetch first page of cards at app start
queryClient.prefetchInfiniteQuery(cardsInfiniteQueryOptions({ q: '*' }));

// persistQueryClient({
//   maxAge: Infinity,
//   queryClient,
//   persister: {
//     persistClient: (client) => storage.set('rq-cache', JSON.stringify(client)),
//     restoreClient: () => {
//       const data = storage.getString('rq-cache');
//       return data ? JSON.parse(data) : undefined;
//     },
//     removeClient: async () => {
//       storage.remove('rq-cache');
//     },
//   },
// });
