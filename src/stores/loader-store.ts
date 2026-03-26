import { create } from 'zustand';

interface LoaderGlobalStore {
  loading: boolean;
  start: () => void;
  stop: () => void;
}

export const useLoaderGlobal = create<LoaderGlobalStore>((set) => ({
  loading: false,
  start: () => set({ loading: true }),
  stop: () => set({ loading: false }),
}));
