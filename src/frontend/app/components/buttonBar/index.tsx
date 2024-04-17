import React, { useState } from 'react';
import TimeRangeSwitch from 'frontend/app/components/timeRangeSwitch';

import './index.scss';
import { GetProject } from 'frontend/app/api/project';
import { useNavigate } from 'react-router-dom';
interface Props {
  weekly: boolean;
  setWeekly: (week: boolean) => void;
  project: GetProject | null;
  workspaceName: string | undefined;
}
const ButtonBar: React.FC<Props> = ({
  weekly,
  setWeekly,
  project,
  workspaceName,
}) => {
  const navigate = useNavigate();
  return (
    <div className='project-upper-cont'>
      <div className='button-bar'>
        <button
          className='back-btn'
          onClick={() => navigate(`/workspace/${workspaceName}`)}
        >
          &larr; Back
        </button>
        <TimeRangeSwitch weekly={weekly} setWeekly={setWeekly} />
      </div>
      {project && (
        <>
          <h1>{project.name}</h1>
          <p>{project.description}</p>
        </>
      )}
    </div>
  );
};

export default ButtonBar;
