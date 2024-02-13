import axios, { AxiosResponse } from 'axios';
import { BACKEND_URL } from 'envConstants';

export interface FileUpload {
  message: string;
  isSuccessful: boolean;
  statusCode: number;
}

export interface IconNameRes{
  message: string
}
export const uploadIcon = async (
  authorizationToken: string,
  orgName: string,
  file: File
): Promise<AxiosResponse<FileUpload>> => {
  const url = BACKEND_URL + '/api/protected/file/upload/' + orgName;
  const formData = new FormData();
  formData.append('file', file);
  const respnse = await axios.post<FileUpload>(url, formData, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authorizationToken}`,
    },
  });
  return respnse;
};

export const getIcon = async (authorizationToken: string, orgName: string) => {
  const url = BACKEND_URL + '/api/protected/file/getIcon/' + orgName;
  const response = await axios.get(
    url,

    {
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${authorizationToken}`,
        Accept: '*/*',
      },
    }
  );
  return response;
};

export const deleteFile = async (
  authorizationToken: string,
  fileName: string
) => {
  const url = BACKEND_URL + '/api/protected/file/delete?fileName=' + fileName;
  const respnse = await axios.delete(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authorizationToken}`,
    },
  });
  return respnse;
};


export const getIconName = async(
  authorizationToken: string,
  orgName: string 
): Promise<AxiosResponse<IconNameRes>>=>{
  const url= BACKEND_URL+'/api/protected/file/getIconName/'+orgName
  const response = await axios.get<IconNameRes>(url,
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${authorizationToken}`,
      },
    })
    return response

}