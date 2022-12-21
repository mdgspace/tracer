import { timeRange } from "../constants";

export const weekAction = () => {
  return {
    type: timeRange.WEEKLY,
  };
};

export const monthAction = () => {
  return {
    type: timeRange.MONTHLY,
  };
};
