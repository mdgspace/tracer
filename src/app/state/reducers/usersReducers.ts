export const setUsernameReducer = (
  state: string | null = null,
  action: { type: string; payload: string }
) => {
  switch (action.type) {
    case 'setUsername':
      return action.payload;
    default:
      return state;
  }
};

const initialState: string[] = [];

export const setAllUsernamesReducer = (
  state = initialState,
  action: { type: string; payload: string[] }
) => {
  switch (action.type) {
    case 'setAllUsernames':
      return action.payload;
    default:
      return state;
  }
};
