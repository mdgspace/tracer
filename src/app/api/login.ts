import axios from 'axios';
import { BACKEND_URL } from 'envConstants';
import { AxiosResponse } from 'axios';

export interface LoginData {
  token: string;
  username: string;
  type: string;
  id: number;
}

export const login = async (
  code: string
): Promise<AxiosResponse<LoginData>> => {
  const url = BACKEND_URL + '/api/auth/login';
  const respnse = await axios.post<LoginData>(
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
