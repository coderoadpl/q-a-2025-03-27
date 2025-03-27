import type { StateCreator } from 'zustand'

import { createStore } from 'zustand/vanilla'
import { persist } from 'zustand/middleware'

export type TMemoryGameState = {
  count: number
  setCount: (count: number) => void
}

const createMemoryGameStore: StateCreator<TMemoryGameState> = (set) => ({
  count: 0,
  setCount: (count: number) => set({ count }),
})

const persistConfig = {
  name: 'game-storage',
}

export const memoryGameStore = createStore<TMemoryGameState>()(
  persist(
    createMemoryGameStore,
    persistConfig
  )
)

