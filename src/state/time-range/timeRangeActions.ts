import { timeRangeActions } from "../constants";

export const weekly = () => {
  return {
    type: timeRangeActions.WEEKLY,
  };
};

export const monthly = () => {
  return {
    type: timeRangeActions.MONTHLY,
  };
};
