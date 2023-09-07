import axios, { AxiosError, AxiosResponse } from 'axios';
import { GenerateCutoutRequest } from '../../../types/GenerateCutoutRequest';

export const generateXlsx = async (ids: string[]) => {
  try {
    const apiAddress = import.meta.env.VITE_BACKEND_ADDRESS;
    const address = `${apiAddress}/to-xlsx`;

    const response: AxiosResponse<string> = await axios.post(address, { ids });
    const requestId = response.data;
    const directDownload = `${apiAddress}/to-xlsx/${requestId}.xlsx`;

    return directDownload;
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const error = new AxiosError(err);
    console.log('errs here:', error);
    throw error;
  }
};
