import axios, { AxiosResponse } from 'axios';
import { GenerateCutoutRequest } from '../types/GenerateCutoutRequest';

export const generateCoutout = async (items: GenerateCutoutRequest) => {
  try {
    const apiAddress = import.meta.env.VITE_BACKEND_ADDRESS;
    const address = `${apiAddress}/cutout`;
    console.log('addreses:', address);

    const response: AxiosResponse<string> = await axios.post(address, items);
    const requestId = response.data;
    const directDownload = `${apiAddress}/cutout/${requestId}.pdf`;
    console.log('directDownload:', directDownload);

    return directDownload;
  } catch (err) {
    console.log('req erred:', err);
  }
};
