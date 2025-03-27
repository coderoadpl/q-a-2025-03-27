import { createStore } from 'zustand/vanilla'
import { persist } from 'zustand/middleware'

export type TMemoryGameState = {
  count: number
  setCount: (count: number) => void
}

export const memoryGameStore = createStore<TMemoryGameState>()(
  persist(
    (set) => ({
      count: 0,
      setCount: (count) => set({ count }),
    }),
    {
      name: 'game-storage',
    }
  )
)

