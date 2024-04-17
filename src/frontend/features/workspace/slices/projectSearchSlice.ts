import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SEARCH } from 'frontend/app/constants/sliceNames';

export const searchSlice = createSlice({
  name: SEARCH,
  initialState: {
    value: '',
  },
  reducers: {
    searchAction: (state: any, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { searchAction } = searchSlice.actions;
export default searchSlice.reducer;
