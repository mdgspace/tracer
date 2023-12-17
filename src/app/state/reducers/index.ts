import { combineReducers } from 'redux';
import { setAllUsernamesReducer, setUsernameReducer } from './usersReducers';
import timeRangeReducer from 'app/components/timeRangeSwitch/timeRangeSlice';
import searchReducer from 'features/home/slices/projectSearchSlice';

const reducers = combineReducers({
  isWeekly: timeRangeReducer,
  searchKeyword: searchReducer,
  setUsername: setUsernameReducer,
  setAllUsernames: setAllUsernamesReducer,
});

export default reducers;
