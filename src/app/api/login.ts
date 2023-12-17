import axios from 'axios';
import { BACKEND_URL } from 'envConstants';

export const login = async (code: string) => {
  const url = BACKEND_URL + '/api/auth/login';
  const respnse = await axios.post(
    url,
    {
      code: code,
    },
    {
      headers: {
        Accept: 'application/json',
      },
    }
  );

  return respnse;
};
