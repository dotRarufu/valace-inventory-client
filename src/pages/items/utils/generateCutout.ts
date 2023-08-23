import axios, { AxiosResponse } from 'axios';
import { GenerateCutoutRequest } from '../../../types/GenerateCutoutRequest';

export const generateCoutout = async (items: GenerateCutoutRequest) => {
  try {
    const apiAddress = import.meta.env.VITE_BACKEND_ADDRESS;
    const address = `${apiAddress}/cutout`;

    const response: AxiosResponse<string> = await axios.post(address, items);
    const requestId = response.data;
    const directDownload = `${apiAddress}/cutout/${requestId}.pdf`;

    return directDownload;
  } catch (err) {
    console.log('req erred:', err);

    throw new Error('errs: ');
  }
};
