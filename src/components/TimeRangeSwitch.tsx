import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { timeRangeModel } from "../models/basicStateType";
import { monthAction, weekAction } from "../state/time-range/timeRangeActions";
import { timeRange } from "../state/constants";

const TimeRangeSwitch = () => {
  const dispatch = useDispatch();
  const selectedTimeRange = useSelector(
    (state: timeRangeModel) => state.timeRangeReducer
  );

  return (
    <div className="timerange-cont">
      <div
        onClick={() => dispatch(weekAction())}
        className={`${selectedTimeRange === timeRange.WEEKLY ? "active" : ""} timerange-btns`}
      >
        Weekly
      </div>
      <div
        onClick={() => dispatch(monthAction())}
        className={`${selectedTimeRange === timeRange.WEEKLY ? "" : "active"} timerange-btns`}
      >
        Monthly
      </div>
    </div>
  );
};

export default TimeRangeSwitch;
