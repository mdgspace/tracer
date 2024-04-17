
import { Routes, Route } from 'react-router-dom';
import ProjectPage from 'frontend/features/project';
import AddProject from 'frontend/features/AddProject';
import Error from 'frontend/features/Error';
import WorkspaceView from 'frontend/features/workspace-view';
import Login from 'frontend/features/login';
import AddWorkspace from 'frontend/features/AddWorkspace';
import Workspace from 'frontend/features/workspace';

import EditWorkspace from 'frontend/features/EditWorkspace';
import EditProject from 'frontend/features/EditProject';
import WorkspaceMembers from 'frontend/features/workspace-members ';
import WorkspaceAddMember from 'frontend/features/WorkspaceAddMember';
import ProjectMembers from 'frontend/features/project-members ';
import ProjectAddMember from 'frontend/features/ProjectAddMember ';
import FirstVisit from '../components/firstVisit';

const BasicRoutes = () => {
  return (
    <Routes>
      <Route path={'/'} element={<WorkspaceView />} />
      <Route path={'/test'} element={<FirstVisit />} />
      <Route
        path={'/project/:spaceName/:projectName'}
        element={<ProjectPage />}
      />
      <Route path={'/addproject/:spaceName'} element={<AddProject />} />
      <Route path={'/workspace/:spaceName'} element={<Workspace />} />
      <Route path={'/login'} element={<Login />} />
      <Route path={'/addWorkspace'} element={<AddWorkspace />} />
      <Route path={'/editWorkspace/:spaceName'} element={<EditWorkspace />} />
      <Route
        path={'/editProject/:spaceName/:projectName'}
        element={<EditProject />}
      />
      <Route
        path={'/workspaceMembers/:spaceName'}
        element={<WorkspaceMembers />}
      />
      <Route
        path={'/workspaceAddMembers/:spaceName'}
        element={<WorkspaceAddMember />}
      />
      <Route
        path={'/projectMembers/:spaceName/:projectName'}
        element={<ProjectMembers />}
      />
      <Route
        path='/projectAddMembers/:spaceName/:projectName'
        element={<ProjectAddMember />}
      />
      <Route path={'/*'} element={<Error />} />
      {/* <Route path={'/testing'} element={<ProjectMembers />} /> */}
    </Routes>
  );
};

export default BasicRoutes;
