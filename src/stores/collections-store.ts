import { create } from 'zustand';
import { persist, createJSONStorage, type StateStorage } from 'zustand/middleware';

import type { Collection, CollectionCard } from '@/types/collection';
import type { ScryfallCard } from '@/types/cards';
import { storage } from '@/libs/mmkv';

const mmkvStorage: StateStorage = {
  getItem: (name) => storage.getString(name) ?? null,
  setItem: (name, value) => storage.set(name, value),
  removeItem: (name) => storage.remove(name),
};

interface CollectionsState {
  collections: Collection[];
  createCollection: (name: string, description: string) => Collection;
  deleteCollection: (id: string) => void;
  addCard: (collectionId: string, card: ScryfallCard, quantity?: number) => void;
  removeCard: (collectionId: string, cardId: string) => void;
  updateCardQuantity: (collectionId: string, cardId: string, quantity: number) => void;
}

export const useCollections = create<CollectionsState>()(
  persist(
    (set, get) => ({
      collections: [],

      createCollection: (name, description) => {
        const now = Date.now();
        const collection: Collection = {
          id: `col_${now}`,
          name,
          description,
          cards: [],
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ collections: [...state.collections, collection] }));
        return collection;
      },

      deleteCollection: (id) => {
        set((state) => ({
          collections: state.collections.filter((c) => c.id !== id),
        }));
      },

      addCard: (collectionId, card, quantity = 1) => {
        set((state) => ({
          collections: state.collections.map((col) => {
            if (col.id !== collectionId) return col;
            const existing = col.cards.find((c) => c.scryfallId === card.id);
            if (existing) {
              return {
                ...col,
                updatedAt: Date.now(),
                cards: col.cards.map((c) =>
                  c.scryfallId === card.id
                    ? { ...c, quantity: c.quantity + quantity }
                    : c,
                ),
              };
            }
            const newCard: CollectionCard = {
              id: `card_${Date.now()}`,
              scryfallId: card.id,
              quantity,
              addedAt: Date.now(),
              card,
            };
            return {
              ...col,
              updatedAt: Date.now(),
              cards: [...col.cards, newCard],
            };
          }),
        }));
      },

      removeCard: (collectionId, cardId) => {
        set((state) => ({
          collections: state.collections.map((col) => {
            if (col.id !== collectionId) return col;
            return {
              ...col,
              updatedAt: Date.now(),
              cards: col.cards.filter((c) => c.id !== cardId),
            };
          }),
        }));
      },

      updateCardQuantity: (collectionId, cardId, quantity) => {
        set((state) => ({
          collections: state.collections.map((col) => {
            if (col.id !== collectionId) return col;
            return {
              ...col,
              updatedAt: Date.now(),
              cards: col.cards.map((c) =>
                c.id === cardId ? { ...c, quantity } : c,
              ),
            };
          }),
        }));
      },
    }),
    {
      name: 'collections',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
