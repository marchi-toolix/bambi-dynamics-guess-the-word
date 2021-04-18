import { createSlice, createAsyncThunk, Dispatch } from "@reduxjs/toolkit";
import { CoreState } from "../../src/store";
import { ErrorResponse } from "../../types/ErrorResponse";
import { addScore } from './scoreSlice'
import { decreaseHPStart, decreaseHPEnd } from './HPSlice'
import { timerReset } from './timerSlice'
import {  setOpen, setMessage, setAutoHideDuration, setSeverity } from './snakebarSlice'

type ErrorResult = {
  error: ErrorResponse | string;
};

type ThunkConfig = { rejectValue: ErrorResult };

type WordState = {
  words: Array<string>;
  loading: boolean;
  isEmpty: boolean;
  error?: ErrorResponse | string;
  currentWord: Array<string>;
  guess: string | null;
  isCurrect: boolean | null;
};

const initialState: WordState = {
  words: [],
  loading: false,
  isEmpty: true,
  error: undefined,
  currentWord: Array.from('default'),
  guess: '',
  isCurrect: null
};

export const fetchWords = createAsyncThunk<Array<string>, void, ThunkConfig>(
  "words/fetchWords",
  // Declare the type your function argument here:
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`https://random-word-api.herokuapp.com/word?number=10000`);
      return (await response.json()) as Array<string>;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const wordSlice = createSlice({
  name: "words",
  initialState,
  reducers: {
    setLoading: (state,action) => {
      state.loading = action.payload;
    },
    
    setWordsByDifficulty: (state, action) => {
      if (action.payload === 'easy') {
        state.words = state.words.filter(word => word.length <= 4);
      }
      if (action.payload === 'mid') {
        state.words = state.words.filter(word => word.length > 4 || word.length < 7);
      }
      if (action.payload === 'hard') {
        state.words = state.words.filter(word => word.length > 7);
      }
    },
    setCurrentWord: (state, action) => {
      state.currentWord = state.words[action.payload].split("")
    },
    handleGuessChange: (state, action) => {
      state.guess = action.payload;
    },
    resetGuess: (state) => {
      state.guess = ""
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWords.pending, (state) => {
      state.loading = true;
      state.isEmpty = true;
    });
    builder.addCase(fetchWords.fulfilled, (state, action) => {
      state.words = action.payload;
      state.loading = false;
      state.isEmpty = false;
    });
    builder.addCase(fetchWords.rejected, (state, action) => {
      state.loading = false;
      state.isEmpty = true;
      state.error = action.payload?.error
    });
  },
});

export const wordState = (state: CoreState) => state.words;

export const { setWordsByDifficulty, setCurrentWord, handleGuessChange, resetGuess,setLoading } = wordSlice.actions;

export const checkGuessAsync = (isCurrect: boolean) => async (dispatch: Dispatch) => {
  dispatch(setLoading(true))
  if (isCurrect === true) {
    console.log(isCurrect);
    dispatch(setMessage(`Great`))
    dispatch(setAutoHideDuration(700))
    dispatch(setSeverity('success'))
    dispatch(setOpen())
    dispatch(addScore())
    dispatch(resetGuess())
    dispatch(timerReset())
  }
  if (isCurrect === false) {
    console.log(isCurrect);
    dispatch(setMessage(`Wrong!`))
    dispatch(setAutoHideDuration(700))
    dispatch(setSeverity('error'))
    dispatch(setOpen())
    dispatch(decreaseHPStart())
    dispatch(resetGuess())
    dispatch(timerReset())
    setTimeout(() => {
      dispatch(decreaseHPEnd())
    }, 400)
  }
  dispatch(setLoading(false))
}

export default wordSlice.reducer;
