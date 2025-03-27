import { describe, it, expect } from 'vitest';
import { createMemoryGameStore } from './store';


describe('Memory game store', () => {
  describe('User wants to start game', () => {
    describe('with easy level', () => {
      it('should start game with 8 cards', () => {
        const memoryGameStore = createMemoryGameStore()
        const initialState = memoryGameStore.getState()

        initialState.startGame('easy')

        const finalState = memoryGameStore.getState()

        expect(finalState.board.length).toBe(8)
      })
    })
    describe('with medium level', () => {
      it('should start game with 12 cards', () => {
        const memoryGameStore = createMemoryGameStore()
        const initialState = memoryGameStore.getState()

        initialState.startGame('medium')

        const finalState = memoryGameStore.getState()

        expect(finalState.board.length).toBe(12)  
      })
    })
    describe('with hard level', () => {
      it('should start game with 16 cards', () => {
        const memoryGameStore = createMemoryGameStore()
        const initialState = memoryGameStore.getState()

        initialState.startGame('hard')

        const finalState = memoryGameStore.getState()

        expect(finalState.board.length).toBe(16)
      })
    })
  })
})
