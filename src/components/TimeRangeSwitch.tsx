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
      <button
        onClick={() => dispatch(weekAction())}
        className={selectedTimeRange === timeRange.WEEKLY ? "active" : ""}
      >
        Weekly
      </button>
      <button
        onClick={() => dispatch(monthAction())}
        className={selectedTimeRange === timeRange.WEEKLY ? "" : "active"}
      >
        Monthly
      </button>
    </div>
  );
};

export default TimeRangeSwitch;
