import {SEARCH} from "../constants";

export const searchAction = (query: string) => {
  return {
    type: SEARCH,
    payload: query,
  };
};
