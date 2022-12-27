import { createSlice } from "@reduxjs/toolkit";
import { TIMERANGE } from "./constants";

export const timeRangeSlice = createSlice({
  name: TIMERANGE,
  initialState: {
    value: true,
  },
  reducers: {
    weekAction: (state) => {
      state.value = true;
    },
    monthAction: (state) => {
      state.value = false;
    },
  },
});

export const { weekAction, monthAction } = timeRangeSlice.actions;
export default timeRangeSlice.reducer;
