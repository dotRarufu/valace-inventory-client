import { FiArrowLeft } from 'react-icons/fi';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { RequestedItem } from './Requests';
import { createRequest } from '../../../services/request';
import { RequestRecord, RequestTagOptions } from '../../../../pocketbase-types';
import useUser from '../../../hooks/useUser';
import { toast } from 'react-hot-toast';
import { PocketbaseError } from '../../../types/PocketbaseError';
import { toastSettings } from '../../../data/toastSettings';

type Form = {
  name: string;
  amount: number;
  unit: string;
  tag: RequestTagOptions;
  description: string;
};

const emptyForm: Form = {
  amount: 0,
  description: '',
  name: '',
  tag: RequestTagOptions.IT,
  unit: '',
};

const CreateRequest = () => {
  // const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser()!;
  const [itemData] = useState<RequestedItem | null>(null);
  const [form, setForm] = useState<Form>(emptyForm);

  const dropdown: RequestTagOptions[] = [
    RequestTagOptions.FURNITURE,
    RequestTagOptions.IT,
    RequestTagOptions.OFFICE,
  ];

  const handleDoneClick = async () => {
    try {
      const data: Omit<RequestRecord, 'status'> = {
        amount: form.amount,
        description: form.description,
        item_name: form.name,
        tag: form.tag,
        unit: form.unit,
        office: user!.id,
      };
      await createRequest(data);

      toast.success('Request sent', toastSettings);
      navigate('/office/requests');
    } catch (err) {
      const error = err as PocketbaseError;
      const errorFields = Object.keys(error.data.data);
      const field =
        errorFields[0].charAt(0).toUpperCase() + errorFields[0].slice(1);
      const message = `${field} - ${error.data.data[errorFields[0]].message}`;

      toast.error(message, toastSettings);
    }
  };

  const handleFormChange = (value: string, field: keyof Form) => {
    const oldValue = { ...form };
    const newValue = { ...oldValue, [field]: value };
    setForm(newValue);
  };

  return (
    <div className="absolute flex h-[calc(100%-32px)] w-full flex-col gap-4 p-0 px-[16px] font-khula">
      <div className="flex items-center gap-2 ">
        <NavLink to=".." className="btn-square btn-sm btn">
          <FiArrowLeft />
        </NavLink>
        <span className="h-[12px] text-lg font-semibold leading-none">
          {itemData?.name}
        </span>
      </div>
      <ul className="flex w-full flex-col gap-2 ">
        <li className="flex flex-col leading-none">
          <div className="flex flex-col gap-4 py-[4px]">
            <span className="h-[16px]  text-lg text-primary/50">Name:</span>

            <input
              type="text"
              className="input-bordered input w-full rounded-[5px] bg-primary/10 pt-[2px] text-primary [box-shadow:0px_0px_0px_0px_rgba(0,16,74,0.05)_inset,_0px_2px_4px_0px_rgba(0,16,74,0.05)_inset,_0px_7px_7px_0px_rgba(0,16,74,0.04)_inset,_0px_15px_9px_0px_rgba(0,_16,_74,_0.03)_inset,_0px_27px_11px_0px_rgba(0,_16,_74,_0.01)_inset,_0px_42px_12px_0px_rgba(0,_16,_74,_0.00)_inset]"
              value={form?.name}
              onChange={e => handleFormChange(e.target.value, 'name')}
            />
          </div>
        </li>
        <div className="flex items-center gap-4">
          <li className="flex flex-1 flex-col leading-none">
            <div className="flex max-h-[53px] items-center justify-between  py-[4px]">
              <span className="h-[16px]  text-lg leading-none text-primary/50">
                Amount:
              </span>

              <input
                type="number"
                className="input-bordered input  w-full max-w-[96px] rounded-[5px] bg-primary/10 pt-[2px] text-primary [box-shadow:0px_0px_0px_0px_rgba(0,16,74,0.05)_inset,_0px_2px_4px_0px_rgba(0,16,74,0.05)_inset,_0px_7px_7px_0px_rgba(0,16,74,0.04)_inset,_0px_15px_9px_0px_rgba(0,_16,_74,_0.03)_inset,_0px_27px_11px_0px_rgba(0,_16,_74,_0.01)_inset,_0px_42px_12px_0px_rgba(0,_16,_74,_0.00)_inset]"
                value={form?.amount}
                onChange={e => handleFormChange(e.target.value, 'amount')}
              />
            </div>
          </li>
          <li className="flex flex-1 flex-col leading-none">
            <div className="flex max-h-[53px] items-center justify-between py-[4px]">
              <span className=" h-[16px] text-lg leading-none text-primary/50">
                Unit:
              </span>

              <input
                type="text"
                className="input-bordered input  w-full max-w-[96px] rounded-[5px] bg-primary/10 pt-[2px] text-primary [box-shadow:0px_0px_0px_0px_rgba(0,16,74,0.05)_inset,_0px_2px_4px_0px_rgba(0,16,74,0.05)_inset,_0px_7px_7px_0px_rgba(0,16,74,0.04)_inset,_0px_15px_9px_0px_rgba(0,_16,_74,_0.03)_inset,_0px_27px_11px_0px_rgba(0,_16,_74,_0.01)_inset,_0px_42px_12px_0px_rgba(0,_16,_74,_0.00)_inset]"
                value={form?.unit}
                onChange={e => handleFormChange(e.target.value, 'unit')}
              />
            </div>
          </li>
        </div>

        <li className="flex flex-col leading-none">
          <div className=" flex flex-col gap-[8px] py-[4px] ">
            <span className="h-[16px] text-lg leading-none text-primary/50">
              Tag:
            </span>

            <select
              className="select-bordered select w-[216px] rounded-[5px] bg-primary/10 pt-[2px] text-primary [box-shadow:0px_0px_0px_0px_rgba(0,16,74,0.05)_inset,_0px_2px_4px_0px_rgba(0,16,74,0.05)_inset,_0px_7px_7px_0px_rgba(0,16,74,0.04)_inset,_0px_15px_9px_0px_rgba(0,_16,_74,_0.03)_inset,_0px_27px_11px_0px_rgba(0,_16,_74,_0.01)_inset,_0px_42px_12px_0px_rgba(0,_16,_74,_0.00)_inset]"
              placeholder=""
              onChange={() => {
                // handled by option onClick
              }}
            >
              {dropdown.map(label => (
                <option key={label}>{label}</option>
              ))}
            </select>
          </div>
        </li>
        <li className="flex flex-col leading-none">
          <div className=" flex flex-col gap-[8px] py-[4px] ">
            <span className="h-[16px] text-lg leading-none text-primary/50">
              Description:
            </span>

            <textarea
              className="textarea-bordered textarea w-full max-w-[445px] rounded-[5px] bg-primary/10 leading-[36px] text-primary [box-shadow:0px_0px_0px_0px_rgba(0,16,74,0.05)_inset,_0px_2px_4px_0px_rgba(0,16,74,0.05)_inset,_0px_7px_7px_0px_rgba(0,16,74,0.04)_inset,_0px_15px_9px_0px_rgba(0,_16,_74,_0.03)_inset,_0px_27px_11px_0px_rgba(0,_16,_74,_0.01)_inset,_0px_42px_12px_0px_rgba(0,_16,_74,_0.00)_inset]"
              placeholder=""
              value={form?.description}
              onChange={e => handleFormChange(e.target.value, 'description')}
            />
          </div>
        </li>
      </ul>

      <div className="h-full"></div>

      <button
        onClick={() => void handleDoneClick()}
        className="btn-primary btn w-full rounded-[5px]"
      >
        Done
      </button>
    </div>
  );
};

export default CreateRequest;
