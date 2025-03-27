import type { StateCreator } from 'zustand'

import { createStore } from 'zustand/vanilla'
import { persist } from 'zustand/middleware'

type TCard = {
  id: string
  value: string
}

type TCardOnBoard = TCard & {
  isFlipped: boolean
  isMatched: boolean
}

const cardsDeck = [
  { id: '1', value: '🥝' },
  { id: '2', value: '🍌' },
  { id: '3', value: '🍇' },
  { id: '4', value: '🍓' },
  { id: '5', value: '🍌' },
  { id: '6', value: '🍅' },
  { id: '7', value: '🍆' },
  { id: '8', value: '🥑' },
] satisfies TCard[]

export type TMemoryGameState = {
  board: TCardOnBoard[],
  startTime: number | null,
  startGame: (level: 'easy' | 'medium' | 'hard') => void
}

const persistConfig = {
  name: 'game-storage',
}

export const createMemoryGameStore = ( {
  getTime
}: {
  getTime: () => number
} ) => {
  const memoryGameStateCreator: StateCreator<TMemoryGameState> = (set) => ({
    board: [],
    startTime: null,
    startGame: (level: 'easy' | 'medium' | 'hard') => {
      const numberOfCards = level === 'easy' ? 8 : level === 'medium' ? 12 : 16
      const cards = cardsDeck.slice(0, numberOfCards / 2)
  
      const cardsToBeAddedOnBoard = [...cards, ...cards].sort(() => Math.random() - 0.5)
  
      const board = cardsToBeAddedOnBoard.map((card) => ({
        ...card,
        isFlipped: false,
        isMatched: false,
      }))
  
      set({ board, startTime: getTime() })
    },
  })

  const memoryGameStore = createStore<TMemoryGameState>()(
    persist(
      memoryGameStateCreator,
      persistConfig
    )
  )

  return memoryGameStore  
}
