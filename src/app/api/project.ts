import axios, { AxiosResponse } from 'axios';
import { BACKEND_URL } from 'envConstants';

export interface projectBody {
  name: string;
  description: string;
  link: string;
}

export interface GetProject{
  id: number,
  name: string, 
  description: string
}

export interface Member{
  [key: string]:string
}
export interface ProjectMembers{
  members:Member
}

export const addProject = async (
  authorizationToken: string,
  orgName: string,
  project: projectBody
) => {
  const url = BACKEND_URL + '/api/protected/project/add/' + orgName;
  const response = await axios.post(url, project, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authorizationToken}`,
    },
  });
  return response;
};

export const updateProject = async (
  authorizationToken: string,
  projectName: string,
  orgName: string,
  project: projectBody
) => {
  const url =
    BACKEND_URL +
    '/api/protected/project/update/' +
    projectName +
    '/' +
    orgName;
  const response = await axios.put(url, project, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authorizationToken}`,
    },
  });
  return response;
};

export const deleteProject = async (
  authorizationToken: string,
  projectName: string,
  orgName: string
) => {
  const url =
    BACKEND_URL +
    '/api/protected/project/delete/' +
    projectName +
    '/' +
    orgName;
  const response = await axios.delete(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authorizationToken}`,
    },
  });
  return response;
};

export const addProjectsMembers = async (
  authorizationToken: string,
  projectName: string,
  orgName: string,
  members: string[]
) => {
  const url =
    BACKEND_URL +
    '/api/protected/project/addMembers/' +
    projectName +
    '/' +
    orgName;
  const response = await axios.post(
    url,
    {
      members: members,
    },
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${authorizationToken}`,
      },
    }
  );
  return response;
};

export const removeProjectMembers = async (
  authorizationToken: string,
  projectName: string,
  orgName: string,
  members: string[]
) => {
  const url =
    BACKEND_URL +
    '/api/protected/project/removeMembers/' +
    projectName +
    '/' +
    orgName;
  const respnse = await axios.delete(url, {
    data: {
      members: members,
    },
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authorizationToken}`,
    },
  });
  return respnse;
};

export const changeProjectMembersStatus = async (
  authorizationToken: string,
  projectName: string,
  orgName: string,
  membersStatus: { [key: string]: string }
) => {
  const url =
    BACKEND_URL +
    '/api/protected/project/changeStatus/' +
    projectName +
    '/' +
    orgName;
  const respnse = await axios.put(
    url,
    {
      projectMembersStatus: membersStatus,
    },
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${authorizationToken}`,
      },
    }
  );

  return respnse;
};

export const getProject = async (
  authorizationToken: string,
  projectName: string,
  orgName: string
):Promise<AxiosResponse<GetProject>> => {
  const url =
    BACKEND_URL +
    '/api/protected/project/getProject/' +
    projectName +
    '/' +
    orgName;
  const response = await axios.get<GetProject>(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authorizationToken}`,
    },
  });
  return response;
};

export const getMembers = async (
  authorizationToken: string,
  projectName: string,
  orgName: string
) : Promise<AxiosResponse<ProjectMembers>>=> {
  const url =
    BACKEND_URL +
    '/api/protected/project/getMembers/' +
    projectName +
    '/' +
    orgName;
  const response = await axios.get<ProjectMembers>(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authorizationToken}`,
    },
  });
  return response;
};
