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
    describe('with very easy level', () => {
      it('should start game with 4 cards', () => {
        const memoryGameStore = createMemoryGameStoreWithMockedTime()
        const initialState = memoryGameStore.getState()

        initialState.startGame('very-easy')

        const finalState = memoryGameStore.getState()

        expect(finalState.board.length).toBe(4)
      })
    })
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

  describe('User wants to flip card', () => {
    it('should flip card', () => {
      const { getState } = createMemoryGameStoreWithMockedTime()

      getState().startGame('very-easy')

      const availableCardsIds = getState().board.map((card) => card.id)

      getState().flipCard(availableCardsIds[0])

      const finalState = getState()

      const flippedCard = finalState.board.find((card) => card.id === availableCardsIds[0])

      expect(flippedCard!.isFlipped).toBe(true)
    })
  })

  describe('User wants to flip three cards in a row', () => {
    describe('and two first cards matched', () => {
      it('should show all three cards flipped', () => {
        const { getState } = createMemoryGameStoreWithMockedTime()

        getState().startGame('easy')

        const firstCardId = getState().board[0].id
        const matchedCardId = getState().board
          .filter((card) => card.id !== firstCardId)
          .find((card) => card.value === getState().board[0].value)!.id
        const thirdCardId = getState().board
          .filter((card) => card.id !== firstCardId && card.id !== matchedCardId)[0].id

        getState().flipCard(firstCardId)
        getState().flipCard(matchedCardId)
        getState().flipCard(thirdCardId)

        const finalState = getState()

        expect(finalState.board.find((card) => card.id === firstCardId)!.isFlipped).toBe(false)
        expect(finalState.board.find((card) => card.id === firstCardId)!.isMatched).toBe(true)
        expect(finalState.board.find((card) => card.id === matchedCardId)!.isFlipped).toBe(false)
        expect(finalState.board.find((card) => card.id === matchedCardId)!.isMatched).toBe(true)
        expect(finalState.board.find((card) => card.id === thirdCardId)!.isFlipped).toBe(true)
      })
    })
    describe('and two first cards not matched', () => {
        it('should show only last card flipped', () => {
          const { getState } = createMemoryGameStoreWithMockedTime()

          getState().startGame('easy')

            const firstCardId = getState().board[0].id
            const notMatchedCardId = getState().board
              .filter((card) => card.id !== firstCardId)
              .find((card) => card.value !== getState().board[0].value)!.id
            const thirdCardId = getState().board
              .filter((card) => card.id !== firstCardId && card.id !== notMatchedCardId)[0].id

            getState().flipCard(firstCardId)
            getState().flipCard(notMatchedCardId)
            getState().flipCard(thirdCardId)

            const finalState = getState()

            expect(finalState.board.find((card) => card.id === firstCardId)!.isFlipped).toBe(false)
            expect(finalState.board.find((card) => card.id === firstCardId)!.isMatched).toBe(false)
            expect(finalState.board.find((card) => card.id === notMatchedCardId)!.isFlipped).toBe(false)
            expect(finalState.board.find((card) => card.id === notMatchedCardId)!.isMatched).toBe(false)
            expect(finalState.board.find((card) => card.id === thirdCardId)!.isFlipped).toBe(true) 
        })
    })
  })

  describe('User wants match all possible cards combinations', () => {
    it('should set endTime', () => {
      const { getState } = createMemoryGameStoreWithMockedTime()

      getState().startGame('very-easy')

      const firstCardId = getState().board[0].id
      const matchedCardId = getState().board
        .filter((card) => card.id !== firstCardId)
        .find((card) => card.value === getState().board[0].value)!.id
      const thirdCardId = getState().board
        .filter((card) => card.id !== firstCardId && card.id !== matchedCardId)[0].id
      const fourthCardId = getState().board
        .filter((card) => card.id !== firstCardId && card.id !== matchedCardId && card.id !== thirdCardId)[0].id

      getState().flipCard(firstCardId)
      getState().flipCard(matchedCardId)
      getState().flipCard(thirdCardId)
      getState().flipCard(fourthCardId)

      const finalState = getState()
      
      expect(finalState.endTime).toBe(MOCKED_TIME)
    })
  })
})
