import type { Card } from './card';

export interface CollectionCard {
  id: string;
  oracleId: string;
  quantity: number;
  addedAt: number;
  card: Card;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  cards: CollectionCard[];
  createdAt: number;
  updatedAt: number;
}
