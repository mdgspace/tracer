import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { timeRangeModel } from "../models/basicStateType";
import { weekAction, monthAction } from "../state/time-range/timeRangeActions";

const TimeRangeSwitch = () => {
  const dispatch = useDispatch();
  const isWeekly = useSelector(
    (state: timeRangeModel) => state.timeRangeReducer
  );

  return (
    <div className="timerange-cont">
      <button
        onClick={() => dispatch(weekAction())}
        className={isWeekly ? "active" : ""}
      >
        Weekly
      </button>
      <button
        onClick={() => dispatch(monthAction())}
        className={isWeekly ? "" : "active"}
      >
        Monthly
      </button>
    </div>
  );
};

export default TimeRangeSwitch;
