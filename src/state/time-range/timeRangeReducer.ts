import { timeRangeConst } from "../constants";
import { Action } from "@reduxjs/toolkit";

// week=true and month=false
const initialState = true;
export const timeRangeReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case timeRangeConst.MONTHLY:
      return false;
    case timeRangeConst.WEEKLY:
      return true;
    default:
      return state;
  }
};
