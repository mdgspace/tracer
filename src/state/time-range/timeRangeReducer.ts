import {timeRange} from "../constants";
import {Action} from "@reduxjs/toolkit";

const initialState = timeRange.WEEKLY;
export const timeRangeReducer = (state = initialState, action: Action) => {
    if (action.type in timeRange) {
        return action.type;
    } else {
        return state;
    }
};
