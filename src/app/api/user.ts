import axios from 'axios';
import { BACKEND_URL } from 'envConstants';

export const getUser = async (authorizationToken: string) => {
  const url = BACKEND_URL + '/api/protected/user/getUser';
  const respnse = await axios.get(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authorizationToken}`,
    },
  });

  return respnse;
};

export const getAllUser = async (authorizationToken: string) => {
  const url = BACKEND_URL + '/api/protected/user/all';
  const respnse = await axios.get(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authorizationToken}`,
    },
  });
  return respnse;
};

export const setOrgBookmarkStatus = async (
  authorizationToken: string,
  status: { [key: string]: boolean }
) => {
  const url = BACKEND_URL + '/api/protected/user/setBookmarkStatus';
  const respnse = await axios.put(
    url,
    {
      bookmarkStatus: status,
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

export const setOrgArcheiveStatus = async (
  authorizationToken: string,
  status: { [key: string]: boolean }
) => {
  const url = BACKEND_URL + '/api/protected/user/setArcheiveStatus';
  const respnse = await axios.put(
    url,
    {
      bookmarkStatus: status,
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

export const getUserOrgs = async (
  authorizationToken: string,
  username: string
) => {
  const url =
    BACKEND_URL +
    '/api/protected/user/setArcheiveStatus/getUserOrgs/' +
    username;
  const respnse = await axios.get(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authorizationToken}`,
    },
  });
  return respnse;
};

export const getUserProjects = async (
  authorizationToken: string,
  username: string
) => {
  const url = BACKEND_URL + '/api/protected/user/getUsersProjects/' + username;
  const respnse = await axios.get(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authorizationToken}`,
    },
  });
  return respnse;
};
