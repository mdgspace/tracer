import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { timeRangeModel } from "../models/basicStateType";
import { monthAction, weekAction } from "../state/timeRangeSlice";

const TimeRangeSwitch = () => {
  const dispatch = useDispatch();
  const isWeekly = useSelector((state: timeRangeModel) => state.isWeekly.value);

  return (
    <div className="timerange-cont">
      <div
        onClick={() => dispatch(weekAction())}
        className={`${isWeekly ? "active" : ""} timerange-btns`}
      >
        Weekly
      </div>
      <div
        onClick={() => dispatch(monthAction())}
        className={`${isWeekly ? "" : "active"} timerange-btns`}
      >
        Monthly
      </div>
    </div>
  );
};

export default TimeRangeSwitch;
