import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { timeperiod } from "./time-range/timeRangeReducer";
import { search } from "./search/searchReducer";

const rootreducer = combineReducers({ timeperiod, search });

const store = configureStore({
  reducer: rootreducer,
});

export { store };
