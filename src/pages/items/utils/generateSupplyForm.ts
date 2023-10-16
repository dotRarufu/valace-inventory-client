import axios, { AxiosError, AxiosResponse } from 'axios';
import { GenerateSupplyFormRequest } from '../SupplyFormSidebar';

export const generateSupplyForm = async (items: GenerateSupplyFormRequest) => {
  try {
    const apiAddress = import.meta.env.VITE_BACKEND_ADDRESS;
    const address = `${apiAddress}/supply-form`;

    const response: AxiosResponse<string> = await axios.post(address, items);
    const requestId = response.data;
    const directDownload = `${apiAddress}/supply-form/${requestId}.xlsx`;

    return directDownload;
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const error = new AxiosError(err);
    console.log('errs here:', error);
    throw error;
  }
};
