import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CoreState } from "../../src/store";
import { ErrorResponse } from '../../types/ErrorResponse'

type ErrorResult = {
  error: ErrorResponse | string
}

type ThunkConfig = { rejectValue: ErrorResult }

type ScoreState = {
  scoreTable: any;
  score: number;
  fullName: string;
  phoneNumber: string;
  status: 'idle' | 'pending' | 'success' | 'fail'
};
type NewScore = {
  fullName: '',
  phoneNumber: ''
}

const initialState: ScoreState = {
  scoreTable: null,
  score: 0,
  fullName: '',
  phoneNumber: '',
  status: 'idle'
};
export type ScoreType = { fullName: string, phoneNumber: string }

export const postNewScore = createAsyncThunk<NewScore, ScoreType, ThunkConfig>(
  'score/postNewScore',
  async (newScore: ScoreType, thunkAPI) => {
    try {
      const response = await fetch('/api/score', {
        method: 'PUT',
        body: JSON.stringify(newScore),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const error = await response.json()

        return thunkAPI.rejectWithValue({ error: error.errors })
      }

      return response.json()
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)

export const getScores = createAsyncThunk<NewScore[], void, ThunkConfig>(
  'score/loadScores',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('/api/score',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return response.json()
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)

const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    addScore: (state) => {
      state.score = state.score + 1;
    },
    resetScore: (state) => {
      state.score = initialState.score;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postNewScore.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(postNewScore.fulfilled, (state) => {
      state.status = 'success';

    });
    builder.addCase(postNewScore.rejected, (state) => {
      state.status = 'fail';
    });
    builder.addCase(getScores.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(getScores.fulfilled, (state,action) => {
      state.scoreTable = action.payload
    });
    builder.addCase(getScores.rejected, (state) => {
      state.scoreTable = []

    });
  },
});

export const scoreState = (state: CoreState) => state.score;

export const { addScore, resetScore } = scoreSlice.actions;

export default scoreSlice.reducer;
