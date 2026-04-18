import { posthog } from '@/libs/posthog';
import { storage } from '@/libs/mmkv';
import type { ScryfallCard } from '@/types/cards';
import type { Collection, CollectionCard } from '@/types/collection';
import { create } from 'zustand';
import {
  createJSONStorage,
  persist,
  type StateStorage,
} from 'zustand/middleware';

const mmkvStorage: StateStorage = {
  getItem: (name) => storage.getString(name) ?? null,
  setItem: (name, value) => storage.set(name, value),
  removeItem: (name) => storage.remove(name),
};

interface DecksState {
  decks: Collection[];
  createDeck: (name: string, description: string) => Collection;
  deleteDeck: (id: string) => void;
  addCard: (deckId: string, card: ScryfallCard, quantity?: number) => void;
  removeCard: (deckId: string, cardId: string) => void;
  updateCardQuantity: (
    deckId: string,
    cardId: string,
    quantity: number,
  ) => void;
}

export const useDecks = create<DecksState>()(
  persist(
    (set, get) => ({
      decks: [],

      createDeck: (name, description) => {
        const now = Date.now();
        const deck: Collection = {
          id: `deck_${now}`,
          name,
          description,
          cards: [],
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ decks: [...state.decks, deck] }));
        return deck;
      },

      deleteDeck: (id) => {
        set((state) => ({
          decks: state.decks.filter((d) => d.id !== id),
        }));
      },

      addCard: (deckId, card, quantity = 1) => {
        // posthog.capture('card_added_to_deck', {
        //   deck_id: deckId,
        //   card_id: card.id,
        //   card_name: card.name,
        //   quantity,
        // });
        set((state) => ({
          decks: state.decks.map((deck) => {
            if (deck.id !== deckId) return deck;
            const existing = deck.cards.find((c) => c.scryfallId === card.id);
            if (existing) {
              return {
                ...deck,
                updatedAt: Date.now(),
                cards: deck.cards.map((c) =>
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
              ...deck,
              updatedAt: Date.now(),
              cards: [...deck.cards, newCard],
            };
          }),
        }));
      },

      removeCard: (deckId, cardId) => {
        const deck = get().decks.find((d) => d.id === deckId);
        const card = deck?.cards.find((c) => c.id === cardId);
        // posthog.capture('card_removed_from_deck', {
        //   deck_id: deckId,
        //   card_id: cardId,
        //   card_name: card?.card.name ?? null,
        // });
        set((state) => ({
          decks: state.decks.map((deck) => {
            if (deck.id !== deckId) return deck;
            return {
              ...deck,
              updatedAt: Date.now(),
              cards: deck.cards.filter((c) => c.id !== cardId),
            };
          }),
        }));
      },

      updateCardQuantity: (deckId, cardId, quantity) => {
        set((state) => ({
          decks: state.decks.map((deck) => {
            if (deck.id !== deckId) return deck;
            return {
              ...deck,
              updatedAt: Date.now(),
              cards: deck.cards.map((c) =>
                c.id === cardId ? { ...c, quantity } : c,
              ),
            };
          }),
        }));
      },
    }),
    {
      name: 'decks',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
