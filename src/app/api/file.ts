import axios from 'axios';
import { BACKEND_URL } from 'envConstants';

export const uploadIcon = async (
  authorizationToken: string,
  orgName: string,
  file: File
) => {
  const url = BACKEND_URL + '/api/protected/file/upload/' + orgName;
  const formData = new FormData();
  formData.append('file', file);
  const respnse = await axios.post(url, formData, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authorizationToken}`,
    },
  });
  return respnse;
};

export const getIcon = async (authorizationToken: string, orgName: string) => {
  const url = BACKEND_URL + '/api/protected/file/getIcon/' + orgName;
  const response = axios.get(url, {
    headers: {
      Authorization: `Bearer ${authorizationToken}`,
    },
  });
  return response;
};

export const deleteFile = async (
  authorizationToken: string,
  fileName: string
) => {
  const url = BACKEND_URL + '/api/protected/file/delete?fileName=' + fileName;
  const respnse = axios.delete(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authorizationToken}`,
    },
  });
  return respnse;
};
