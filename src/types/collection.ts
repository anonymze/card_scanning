import type { ScryfallCard } from './cards'

export interface CollectionCard {
  id: string
  scryfallId: string
  quantity: number
  addedAt: number
  card: ScryfallCard
}

export interface Collection {
  id: string
  name: string
  description: string
  cards: CollectionCard[]
  createdAt: number
  updatedAt: number
}
