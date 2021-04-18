import { createSlice } from '@reduxjs/toolkit'
import { CoreState } from '../../src/store'

type GameState = {
  status: boolean,
  hp: number,
  score: number,
  timer: number,
  difficulty: 'easy' | 'mid' | 'hard',
  level: number,
  playedWords: Array<{
    guess: string,
    currectWord: string,
    currect: boolean,
  }>,
}

const initialState: GameState = {
  status: false,
  hp: 100,
  score: 0,
  timer: 900,
  difficulty: 'easy',
  level: 0,
  playedWords: [],

}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state) => {
        state.status = true
    },
    endGame: (state) => {
        state.status = false
    },
    setDifficulty: (state, action) => {
      console.log(action.payload);
      state.difficulty = action.payload;
    },
    nextLevel: (state, action) => {
      state.level = state.level + 1
      state.playedWords.push(action.payload)
    }
  },
 
})

export const gameState = (state: CoreState) => state.game

export const { startGame, endGame, nextLevel, setDifficulty} = gameSlice.actions

export default gameSlice.reducer
