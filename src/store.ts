import type { StateCreator } from 'zustand'

import { createStore } from 'zustand/vanilla'
import { persist } from 'zustand/middleware'

type TCard = {
  value: string
}

type TCardOnBoard = TCard & {
  id: string
  isFlipped: boolean
  isMatched: boolean
}

const cardsDeck = [
  { value: '🥝' },
  { value: '🍌' },
  { value: '🍇' },
  { value: '🍓' },
  { value: '🍌' },
  { value: '🍅' },
  { value: '🍆' },
  { value: '🥑' },
] satisfies TCard[]

export type TMemoryGameState = {
  board: TCardOnBoard[],
  startTime: number | null,
  startGame: (level: 'easy' | 'medium' | 'hard') => void
  flipCard: (id: string) => void
}

const persistConfig = {
  name: 'game-storage',
}

export const createMemoryGameStore = ( {
  getTime
}: {
  getTime: () => number
} ) => {
  const memoryGameStateCreator: StateCreator<TMemoryGameState> = (set, getState) => ({
    board: [],
    startTime: null,
    startGame: (level: 'easy' | 'medium' | 'hard') => {
      const numberOfCards = level === 'easy' ? 8 : level === 'medium' ? 12 : 16
      const cards = cardsDeck.slice(0, numberOfCards / 2)
      
      
  
      const cardsToBeAddedOnBoard = [...cards, ...cards].sort(() => Math.random() - 0.5)
      const cardsToBeAddedOnBoardWithIds = cardsToBeAddedOnBoard.map((card) => {
        const cardRandomId = Math.random().toString(36).substring(2, 15)
        return {
          ...card,
          id: cardRandomId,
        }
      })
  
      const board = cardsToBeAddedOnBoardWithIds.map((card) => ({
        ...card,
        isFlipped: false,
        isMatched: false,
      }))
  
      set({ board, startTime: getTime() })
    },
    flipCard: (id: string) => {
      const board = getState().board
      const card = board.find((card) => card.id === id)
      if(!card) return

      if(card.isFlipped) return

      set((state) => {
        const newBoard = state.board.map((card) => {
          if(card.id === id) {
            return { ...card, isFlipped: true }
          }
          return card
        })
        return { board: newBoard }
      })
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
