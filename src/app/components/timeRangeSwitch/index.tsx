import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { timeRangeModel } from 'features/project/components/contributorCard/types';
import { weekAction, monthAction } from './timeRangeSlice';
import './index.scss';

interface Props{
  weekly: boolean,
  setWeekly: (bool: boolean)=>void
}

const TimeRangeSwitch:React.FC<Props> = ({weekly, setWeekly}) => {
  const dispatch = useDispatch();
  const isWeekly = useSelector((state: timeRangeModel) => state.isWeekly.value);

  return (
    <div className='timerange-cont'>
      <button
        onClick={() => setWeekly(!weekly)}
        className={weekly ? 'active' : ''}
      >
        Weekly{' '}
      </button>
      <button
        onClick={() => setWeekly(!weekly)}
        className={weekly ? '' : 'active'}
      >
        Monthly{' '}
      </button>
    </div>
  );
};

export default TimeRangeSwitch;
