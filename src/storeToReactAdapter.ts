import { useStore } from 'zustand'

import type { TMemoryGameState } from './store';
import { createMemoryGameStore } from './store'

export const useMemoryGameStore = <T>(selector: (state: TMemoryGameState) => T): T => {
  const memoryGameStore = createMemoryGameStore({
    getTime: () => Date.now()
  })
  return useStore(memoryGameStore, selector)
} 
