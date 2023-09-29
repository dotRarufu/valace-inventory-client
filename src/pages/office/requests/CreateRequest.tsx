import { FiArrowLeft } from 'react-icons/fi';
import { NavLink, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RequestedItem, dummyRequestedItems } from './Requests';

const CreateRequest = () => {
  const { id } = useParams();
  const [itemData, setItemData] = useState<RequestedItem | null>(null);

  useEffect(() => {
    const data = dummyRequestedItems.filter(d => d.id === Number(id))[0];

    setItemData(data);
  }, [id]);

  const dropdown = ['1', 'w'];

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
              />
            </div>
          </li>
          <li className="flex flex-1 flex-col leading-none">
            <div className="flex max-h-[53px] items-center justify-between py-[4px]">
              <span className=" h-[16px] text-lg leading-none text-primary/50">
                Unit:
              </span>

              <select
                className="select-bordered select w-full max-w-[96px] rounded-[5px] bg-primary/10 pt-[2px] text-primary [box-shadow:0px_0px_0px_0px_rgba(0,16,74,0.05)_inset,_0px_2px_4px_0px_rgba(0,16,74,0.05)_inset,_0px_7px_7px_0px_rgba(0,16,74,0.04)_inset,_0px_15px_9px_0px_rgba(0,_16,_74,_0.03)_inset,_0px_27px_11px_0px_rgba(0,_16,_74,_0.01)_inset,_0px_42px_12px_0px_rgba(0,_16,_74,_0.00)_inset]"
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
            />
          </div>
        </li>
      </ul>

      <div className="h-full"></div>

      <button className="btn-primary btn w-full rounded-[5px]">Done</button>
    </div>
  );
};

export default CreateRequest;
