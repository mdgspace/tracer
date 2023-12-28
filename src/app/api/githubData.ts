import axios, { AxiosResponse } from 'axios';
import { BACKEND_URL } from 'envConstants';



export interface Contributors {
  [contributorName: string]: {
    issues: number,
    pulls: number,
    commits:number
  };
}

export interface ProjectsGithubData {
  [contributorName: string]: {
    issues: number,
    pulls: number,
    commits:number
  };
}


export interface OrgRank{
  contributors: Contributors
}


// Contributors==project issues commits pull
export interface OrgProjectGithubData{
  projects: ProjectsGithubData
}



export const getOrgGithubData = async (
  authorizationToken: string,
  orgName: string,
  monthly: boolean
):Promise<AxiosResponse<OrgProjectGithubData>> => {
  const url =
    BACKEND_URL + '/api/protected/github/' + orgName + '?monthly=' + monthly;
  const respnse = await axios.get<OrgProjectGithubData>(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authorizationToken}`,
    },
  });
  return respnse;
};

export const getOrgRank = async (
  authorizationToken: string,
  orgName: string,
  monthly: boolean
): Promise<AxiosResponse<OrgRank>> => {
  const url =
    BACKEND_URL +
    '/api/protected/github/' +
    orgName +
    '/getRanks?monthly=' +
    monthly;
  const respnse = await axios.get<OrgRank>(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authorizationToken}`,
    },
  });
  return respnse;
};

export const getProjectGithubData = async (
  authorizationToken: string,
  orgName: string,
  projectName: string,
  monthly: boolean
) => {
  const url =
    BACKEND_URL +
    '/api/protected/github/' +
    orgName +
    '/' +
    projectName +
    '?monthly=' +
    monthly;
  const respnse = await axios.get(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authorizationToken}`,
    },
  });
  return respnse;
};
