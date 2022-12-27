import { combineReducers, configureStore } from "@reduxjs/toolkit";
import timeRangeReducer from "./timeRangeSlice";
import searchReducer from "./searchSlice";

const rootreducer = combineReducers({
  isWeekly: timeRangeReducer,
  searchKeyword: searchReducer,
});

const store = configureStore({
  reducer: rootreducer,
});

export { store };
