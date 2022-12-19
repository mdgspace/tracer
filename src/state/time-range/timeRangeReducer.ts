import { timeRangeActions } from "../constants";
import { Action } from "@reduxjs/toolkit";

// week=true and month=false
const initialState = true;
export const timeperiod = (state = initialState, action: Action) => {
  switch (action.type) {
    case timeRangeActions.MONTHLY:
      return false;
    case timeRangeActions.WEEKLY:
      return true;
    default:
      return state;
  }
};
