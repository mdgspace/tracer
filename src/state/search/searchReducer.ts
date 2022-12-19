import { searchActions } from "../constants";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState = "";
export const search = (state = initialState, action: PayloadAction<string>) => {
  switch (action.type) {
    case searchActions.SEARCH:
      return action.payload;
    default:
      return state;
  }
};
