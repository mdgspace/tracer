import SearchBar from 'app/components/search';
import React from 'react';
import './index.scss';
import WorkspaceCard from './workspace-card';
import { workSpaceData } from 'app/utils/workspaceData';
const WorkspaceView = () => {
  return (
    <div className='workspaceview-container'>
      <div className='workspaceview-header'>
        <SearchBar />
        <button>Create a workspace</button>
      </div>
      <div className='workspaceview-card-container'>
        {workSpaceData.map((workspace) => {
          return (
            <WorkspaceCard
              key={workspace.id}
              id={workspace.id}
              description={workspace.description}
              title={workspace.title}
              imgURL={workspace.imgURL}
            />
          );
        })}
      </div>
    </div>
  );
};

export default WorkspaceView;
