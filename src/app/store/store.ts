import { combineReducers, configureStore } from '@reduxjs/toolkit';
import timeRangeReducer from 'app/components/timeRangeSwitch/timeRangeSlice';
import searchReducer from 'features/home/slices/projectSearchSlice';

const rootreducer = combineReducers({
  isWeekly: timeRangeReducer,
  searchKeyword: searchReducer,
});

const store = configureStore({
  reducer: rootreducer,
});

export { store };
