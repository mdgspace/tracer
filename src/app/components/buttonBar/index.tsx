import React, { useState } from 'react';
import TimeRangeSwitch from 'app/components/timeRangeSwitch';

import './index.scss';
import { GetProject } from 'app/api/project';
interface Props{
  weekly: boolean,
  setWeekly: (week:boolean)=>void
  project: GetProject | null
  
}
const ButtonBar:React.FC<Props> = ({weekly, setWeekly, project}) => {
  return (
    <div className='project-upper-cont'>
      <div className='button-bar'>
        <button className='back-btn'>&larr; Back</button>
        <TimeRangeSwitch weekly={weekly} setWeekly={setWeekly} />
      </div>
     { project&&<>
      <h1>{project.name}</h1>
      <p>
         {project.description}
      </p>
      </>}
    </div>
  );
};

export default ButtonBar;
