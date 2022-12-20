import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { timeRangeReducer } from "./time-range/timeRangeReducer";
import { searchReducer } from "./search/searchReducer";

const rootreducer = combineReducers({ timeRangeReducer, searchReducer });

const store = configureStore({
  reducer: rootreducer,
});

export { store };
