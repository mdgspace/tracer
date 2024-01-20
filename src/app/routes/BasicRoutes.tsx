import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProjectPage from 'features/project';
import AddProject from 'features/AddProject';
import Error from 'features/Error';
import WorkspaceView from 'features/workspace-view';
import Login from 'features/login';
import AddWorkspace from 'features/AddWorkspace';
import Workspace from 'features/workspace';
const BasicRoutes = () => {
  return (
    <Routes>
      <Route path={'/'} element={<WorkspaceView />} />
      <Route path={'/projects/:projectName'} element={<ProjectPage />} />
      <Route path={'/addproject/:spaceName'} element={<AddProject />} />
      <Route path={'/workspace/:spaceName'} element={<Workspace />} />
      <Route path={'/login'} element={<Login />} />
      <Route path={'/addWorkspace'} element={<AddWorkspace />} />
      <Route path={'/*'} element={<Error />} />
    </Routes>
  );
};

export default BasicRoutes;
