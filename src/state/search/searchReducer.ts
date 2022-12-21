import {SEARCH} from "../constants";
import {PayloadAction} from "@reduxjs/toolkit";

const initialState = "";

export const searchReducer = (
    state = initialState,
    action: PayloadAction<string>
) => {
  if (action.type === SEARCH) {
    return action.payload;
  } else {
    return state;
  }
};
