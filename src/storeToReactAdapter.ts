import { useStore } from 'zustand'

import type { TMemoryGameState } from './store';
import { createMemoryGameStore } from './store'

export const useMemoryGameStore = <T>(selector: (state: TMemoryGameState) => T): T => {
  const memoryGameStore = createMemoryGameStore()
  return useStore(memoryGameStore, selector)
} 
