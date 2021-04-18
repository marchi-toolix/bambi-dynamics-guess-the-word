import { createSlice } from "@reduxjs/toolkit";
import { CoreState } from "../../src/store";

type TimerState = {
  isRuning: boolean;
  timeCount: number; //  in seconds
};

const initialState: TimerState = {
  isRuning: false,        //  
  timeCount: 30,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    tick: (state) => {
      if (state.timeCount > 0) state.timeCount = state.timeCount - 1;
    },
    timerReset: (state) => {
      state.timeCount = initialState.timeCount;
    },
    timerStop: (state) => {
      state
    },
  },
});

export const timerState = (state: CoreState) => state.timer;

export const { tick, timerReset } = timerSlice.actions;

export default timerSlice.reducer;
