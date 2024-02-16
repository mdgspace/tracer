import axios, { AxiosResponse } from 'axios';
import { BACKEND_URL } from 'envConstants';

export interface UserData {
  message: string;
}

export interface UserOrgs {
  userOrgs: UserOrgDetails;
}

export interface UserOrgDetails {
  [key: string]: {
    bookmark: string;
    role: string;
    archeive: string;
  };
}

export interface AllUserData {
  users: {
    id: number;
    username: string;
  }[];
}

export const getUser = async (
  authorizationToken: string
): Promise<AxiosResponse<UserData>> => {
  const url = BACKEND_URL + '/api/protected/user/getUser';

  const respnse = await axios.get<UserData>(url, {
    headers: {
      Accept: 'application/json',

      Authorization: `Bearer ${authorizationToken}`,
    },
  });

  return respnse;
};

export const getAllUser = async (
  authorizationToken: string
): Promise<AxiosResponse<AllUserData>> => {
  const url = BACKEND_URL + '/api/protected/user/all';
  const respnse = await axios.get<AllUserData>(url, {
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
      archeiveStatus: status,
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
): Promise<AxiosResponse<UserOrgs>> => {
  const url = BACKEND_URL + '/api/protected/user/getUserOrgs/' + username;
  const respnse = await axios.get<UserOrgs>(url, {
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
