import { describe, it, expect, vi } from 'vitest';
import { createMemoryGameStore } from './store';

const MOCKED_TIME = 1743104321081
const mockedGetTime = vi.fn(() => MOCKED_TIME)

const createMemoryGameStoreWithMockedTime = () => {
  return createMemoryGameStore({
    getTime: mockedGetTime
  })
}

describe('Memory game store', () => {
  describe('User wants to start game', () => {
    describe('with easy level', () => {
      it('should start game with 8 cards', () => {
        const memoryGameStore = createMemoryGameStoreWithMockedTime()
        const initialState = memoryGameStore.getState()

        initialState.startGame('easy')

        const finalState = memoryGameStore.getState()

        expect(finalState.board.length).toBe(8)
      })
      it('should set startTime', () => {
        const memoryGameStore = createMemoryGameStoreWithMockedTime()
        const initialState = memoryGameStore.getState()

        initialState.startGame('easy')
        
        const finalState = memoryGameStore.getState()

        expect(finalState.startTime).toBe(MOCKED_TIME)
      })
    })
    describe('with medium level', () => {
      it('should start game with 12 cards', () => {
        const memoryGameStore = createMemoryGameStoreWithMockedTime()
        const initialState = memoryGameStore.getState()

        initialState.startGame('medium')

        const finalState = memoryGameStore.getState()

        expect(finalState.board.length).toBe(12)  
      })
    })
    describe('with hard level', () => {
      it('should start game with 16 cards', () => {
        const memoryGameStore = createMemoryGameStoreWithMockedTime()
        const initialState = memoryGameStore.getState()

        initialState.startGame('hard')

        const finalState = memoryGameStore.getState()

        expect(finalState.board.length).toBe(16)
      })
    })
  })
})
