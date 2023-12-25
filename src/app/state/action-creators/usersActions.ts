import { Dispatch } from 'redux';

export const setUsername = (username: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: 'setUsername',
      payload: username,
    });
  };
};

export const setAllUsernames = (usernames: string[]) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: 'setAllUsernames',
      payload: usernames,
    });
  };
};

