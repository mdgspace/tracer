import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { timeRangeActions } from "../state/constants";
import { timeperiodmodel } from "../models/basicStateType";

const TimeRangeSwitch = () => {
  const dispatch = useDispatch();
  const timeperiod = useSelector((state: timeperiodmodel) => state.timeperiod);

  return (
    <div className="timerange-cont">
      <button
        onClick={() => dispatch({ type: timeRangeActions.WEEKLY })}
        className={timeperiod ? "active" : ""}
      >
        Weekly
      </button>
      <button
        onClick={() => dispatch({ type: timeRangeActions.MONTHLY })}
        className={timeperiod ? "" : "active"}
      >
        Monthly
      </button>
    </div>
  );
};

export default TimeRangeSwitch;
