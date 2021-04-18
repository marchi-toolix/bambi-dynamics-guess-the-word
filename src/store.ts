import { combineReducers, configureStore, getDefaultMiddleware  } from '@reduxjs/toolkit'

import gameReducer from '../lib/slices/gameSlice'
import wordReducer from '../lib/slices/wordSlice'
import HPReducer from '../lib/slices/HPSlice'
import timerReducer from "../lib/slices/timerSlice";
import scoreReducer from "../lib/slices/scoreSlice";
import snakebarReducer from '../lib/slices/snakebarSlice'

const middlewares = getDefaultMiddleware<CoreState>()

const rootReducer = combineReducers({
  game: gameReducer,
  words: wordReducer,
  HP: HPReducer,
  timer: timerReducer,
  score: scoreReducer,
  snakebar: snakebarReducer,
});

export type CoreState = ReturnType<typeof rootReducer>


export default configureStore({
  reducer: rootReducer,
  middleware: middlewares,
  devTools: true,
})
