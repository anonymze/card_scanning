import { create } from 'zustand'

interface LoaderStore {
  loading: boolean
  start: () => void
  stop: () => void
}

export const useLoaderGlobal = create<LoaderStore>((set) => ({
  loading: false,
  start: () => set({ loading: true }),
  stop: () => set({ loading: false }),
}))
