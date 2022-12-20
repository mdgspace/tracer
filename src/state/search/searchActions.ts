import { searchConst } from "../constants";

export const searchAction = (srch: string) => {
  return {
    type: searchConst.SEARCH,
    payload: srch,
  };
};
