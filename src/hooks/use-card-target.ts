import { useCollections } from '@/stores/collections-store';
import { useDecks } from '@/stores/decks-store';
import type { Card } from '@/types/card';
import type { CollectionCard } from '@/types/collection';

export type CardTargetType = 'collection' | 'deck';

export interface CardTarget {
  cards: CollectionCard[];
  addCard: (card: Card, quantity?: number) => void;
  updateQuantity: (cardId: string, quantity: number) => void;
  removeCard: (cardId: string) => void;
}

export function useCardTarget(type: CardTargetType, id: string): CardTarget {
  const collection = useCollections((s) =>
    s.collections.find((c) => c.id === id),
  );
  const deck = useDecks((s) => s.decks.find((d) => d.id === id));

  const colAdd = useCollections((s) => s.addCard);
  const colUpdate = useCollections((s) => s.updateCardQuantity);
  const colRemove = useCollections((s) => s.removeCard);
  const deckAdd = useDecks((s) => s.addCard);
  const deckUpdate = useDecks((s) => s.updateCardQuantity);
  const deckRemove = useDecks((s) => s.removeCard);

  if (type === 'collection') {
    return {
      cards: collection?.cards ?? [],
      addCard: (card, qty) => colAdd(id, card, qty),
      updateQuantity: (cardId, qty) => colUpdate(id, cardId, qty),
      removeCard: (cardId) => colRemove(id, cardId),
    };
  }
  return {
    cards: deck?.cards ?? [],
    addCard: (card, qty) => deckAdd(id, card, qty),
    updateQuantity: (cardId, qty) => deckUpdate(id, cardId, qty),
    removeCard: (cardId) => deckRemove(id, cardId),
  };
}
