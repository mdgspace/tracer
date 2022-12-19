import { searchActions } from "../constants";

export const search = (srch: string) => {
  return {
    type: searchActions.SEARCH,
    payload: srch,
  };
};
