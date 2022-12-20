import { searchConst } from "../constants";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState = "";

export const searchReducer = (
  state = initialState,
  action: PayloadAction<string>
) => {
  switch (action.type) {
    case searchConst.SEARCH:
      return action.payload;
    default:
      return state;
  }
};
