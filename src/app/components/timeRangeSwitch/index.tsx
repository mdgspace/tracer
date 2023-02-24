import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { timeRangeModel } from 'features/project/components/contributorCard/types';
import { weekAction, monthAction } from './timeRangeSlice';
import './index.scss';

const TimeRangeSwitch = () => {
  const dispatch = useDispatch();
  const isWeekly = useSelector((state: timeRangeModel) => state.isWeekly.value);

  return (
    <div className='timerange-cont'>
      <button
        onClick={() => dispatch(weekAction())}
        className={isWeekly ? 'active' : ''}
      >
        Weekly{' '}
      </button>
      <button
        onClick={() => dispatch(monthAction())}
        className={isWeekly ? '' : 'active'}
      >
        Monthly{' '}
      </button>
    </div>
  );
};

export default TimeRangeSwitch;
