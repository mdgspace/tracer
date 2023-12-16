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
