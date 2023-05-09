import SearchBar from 'app/components/search';
import React from 'react';
import './index.scss';
import WorkspaceCard from './workspace-card';

const WorkspaceView = () => {
  return (
    <div className='workspaceview-container'>
      <div className='workspaceview-header'>
        <SearchBar />
        <button>Create a workspace</button>
      </div>
      <div className='workspaceview-card-container'>
        <WorkspaceCard />
        <WorkspaceCard />
        <WorkspaceCard />
        <WorkspaceCard />
        <WorkspaceCard />
        <WorkspaceCard />
        <WorkspaceCard />
      </div>
    </div>
  );
};

export default WorkspaceView;
