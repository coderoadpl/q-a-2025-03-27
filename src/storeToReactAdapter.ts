import { useStore } from 'zustand'

import type { TMemoryGameState } from './store';
import { createMemoryGameStore } from './store'

const memoryGameStore = createMemoryGameStore({
  getTime: () => Date.now()
})

export const useMemoryGameStore = <T>(selector: (state: TMemoryGameState) => T): T => {
  return useStore(memoryGameStore, selector)
} 
