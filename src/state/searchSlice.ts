import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SEARCH } from "./constants";

export const searchSlice = createSlice({
  name: SEARCH,
  initialState: {
    value: "",
  },
  reducers: {
    searchAction: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { searchAction } = searchSlice.actions;
export default searchSlice.reducer;
