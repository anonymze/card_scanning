import { QueryClient } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/query-persist-client-core";
import { storage } from "@/libs/mmkv";

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
			staleTime: 60 * 240 * 1000, // 4h
      gcTime: Infinity
		},
	},
});

persistQueryClient({
  maxAge: Infinity,
	queryClient,
	persister: {
		persistClient: (client) => storage.set("rq-cache", JSON.stringify(client)),
		restoreClient: () => {
			const data = storage.getString("rq-cache");
			return data ? JSON.parse(data) : undefined;
		},
		removeClient: async () => { storage.remove("rq-cache"); },
	},
});
