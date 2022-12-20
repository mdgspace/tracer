import { timeRangeConst } from "../constants";

export const weekAction = () => {
  return {
    type: timeRangeConst.WEEKLY,
  };
};

export const monthAction = () => {
  return {
    type: timeRangeConst.MONTHLY,
  };
};
