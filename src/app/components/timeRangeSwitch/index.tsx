import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { timeRangeModel } from 'features/project/components/contributorCard/types';
import { weekAction, monthAction } from './timeRangeSlice';
import './index.scss';
import { clearConfigCache } from 'prettier';

interface Props {
  weekly: boolean;
  setWeekly: (bool: boolean) => void;
}

const TimeRangeSwitch: React.FC<Props> = ({ weekly, setWeekly }) => {
  // const dispatch = useDispatch();
  // const isWeekly = useSelector((state: timeRangeModel) => state.isWeekly.value);
 useEffect(()=>{
  console.log(weekly,"makki")
 },[weekly, setWeekly])
  return (
    <div className='timerange-cont'>
      <button
        onClick={() => setWeekly(true)}
        className={weekly ? 'active' :''}
        style={weekly?{}:{background:'transparent'}}
     
      >
        Weekly{' '}
      </button>
      <button
        onClick={() => setWeekly(false)}
        className={weekly ? '' :'active'}
        style={weekly?{background:'transparent'}:{}}
      >
        Monthly{' '}
      </button>
    </div>
  );
};

export default TimeRangeSwitch;
