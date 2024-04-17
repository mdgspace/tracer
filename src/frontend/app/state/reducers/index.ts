import { combineReducers } from 'redux';
import { setAllUsernamesReducer, setUsernameReducer } from './usersReducers';
import timeRangeReducer from 'frontend/app/components/timeRangeSwitch/timeRangeSlice';
import searchReducer from 'frontend/features/workspace/slices/projectSearchSlice';
import { orgReducer } from './orgReducers';

export const reducers = combineReducers({
  isWeekly: timeRangeReducer,
  searchKeyword: searchReducer,
  setUsername: setUsernameReducer,
  setAllUsernames: setAllUsernamesReducer,
  organization: orgReducer,
});

export type RootState = ReturnType<typeof reducers>;
