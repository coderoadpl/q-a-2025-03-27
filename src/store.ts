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
  startGame: (level: 'very-easy' | 'easy' | 'medium' | 'hard') => void
  flipCard: (id: string) => void
}

const persistConfig = {
  name: 'game-storage',
}

export const createMemoryGameStore = ({
  getTime
}: {
  getTime: () => number
}) => {
  const memoryGameStateCreator: StateCreator<TMemoryGameState> = (set, getState) => ({
    board: [],
    startTime: null,
    startGame: (level: 'very-easy' | 'easy' | 'medium' | 'hard') => {
      const numberOfCards = level === 'very-easy' ? 4 : level === 'easy' ? 8 : level === 'medium' ? 12 : 16
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
      if (!card) return
      if (card.isFlipped) return

      const allFlippedCards = board.filter((card) => card.isFlipped)
      const allFlippedCardsIds = allFlippedCards.map((card) => card.id)
      const allFlippedCardsValues = allFlippedCards.map((card) => card.value)
      const areFlippedCardsMatching = allFlippedCardsValues.every((value, index, array) => value === array[0])
      const numberOfFlippedCards = allFlippedCards.length

      if (numberOfFlippedCards === 2) {
        const newBoard = board.map((card) => {
          if (card.id === id) {
            return { ...card, isFlipped: true }
          }
          if (allFlippedCardsIds.includes(card.id)) {
            return { ...card, isFlipped: false, isMatched: areFlippedCardsMatching }
          }
          return card
        })
        set({ board: newBoard })
      } else {
        set({
          board: board.map((card) => {
            if (card.id === id) {
              return { ...card, isFlipped: true }
            }
            return card
          })
        })
      }
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
