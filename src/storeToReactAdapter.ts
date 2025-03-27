import { useStore } from 'zustand'

import { memoryGameStore, TMemoryGameState } from './store'

export const useMemoryGameStore = <T>(selector: (state: TMemoryGameState) => T): T => {
  return useStore(memoryGameStore, selector)
} 
