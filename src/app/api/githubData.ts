import axios from 'axios';
import { BACKEND_URL } from 'envConstants';

export const getOrgGithubData = async (
  authorizationToken: string,
  orgName: string,
  monthly: boolean
) => {
  const url =
    BACKEND_URL + '/api/protected/github/' + orgName + '?monthly=' + monthly;
  const respnse = await axios.get(url, {
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
) => {
  const url =
    BACKEND_URL +
    '/api/protected/github/' +
    orgName +
    '/getRank?monthly=' +
    monthly;
  const respnse = await axios.get(url, {
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
