import { useState } from 'react';
import TextAreaField from '../Field/TextAreaField';
import TextInputField from '../Field/TextInputField';
import SelectField from '../Field/SelectField';
import ToggleField from '../Field/ToggleField';
import Carousel from './Carousel';

const ItemsSidebar = () => {
  const [isUpdate, setIsUpdate] = useState(true);

  return (
    <div className="drawer-side z-[9999]">
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <div className="px-[32px] w-[723px] pt-0 h-full bg-secondary text-secondary-content font-khula flex flex-col gap-[8px] overflow-y-scroll">
        <div className="flex justify-between pt-[32px] pb-[16px]  items-center">
          <span className="font-semibold h-[21px] text-[32px] leading-none">
            Item Details
          </span>
          <div className="flex gap-[8px] ">
            <button className="btn btn-primary ">add</button>
            <button className="btn btn-success ">qr</button>
            <button className="btn btn-error ">delete</button>
          </div>
        </div>

        <Carousel />

        <ul>
          <TextInputField
            label="Property Number"
            stringContent="ABC"
            isUpdate={isUpdate}
          />
          <TextInputField
            label="Name"
            stringContent="Table"
            isUpdate={isUpdate}
          />
          <TextInputField
            label="Quantity"
            stringContent="24"
            isUpdate={isUpdate}
          />
          <SelectField
            label="Type"
            elementContent={
              <span className="badge h-fit text-[20px] badge-primary py-[4px] px-[24px] -translate-y-[12.5%] ">
                <span className="h-[13px] leading-none uppercase">
                  Furniture
                </span>
              </span>
            }
            dropdown={[{ label: 'Furniture' }, { label: 'Office' }]}
            isUpdate={isUpdate}
          />
          <ToggleField
            label="Status"
            elementContent={
              <a className="text-success text-[24px] font-semibold uppercase h-[16px] leading-none">
                Available
              </a>
            }
            values={{
              checkedLabel: 'AVAILABLE',
              uncheckedLabel: 'UNAVAILABLE',
            }}
            initialIsChecked={true}
            isUpdate={isUpdate}
          />
          <TextInputField
            label="Location"
            stringContent="3F"
            isUpdate={isUpdate}
          />
          <TextInputField
            label="Supplier"
            stringContent="ValACE"
            isUpdate={isUpdate}
          />
          {!isUpdate && (
            <>
              <TextInputField label="Date Added" stringContent="07/03/2023" />
              <TextInputField label="Serial Number" stringContent="2023-0234" />
            </>
          )}

          <TextAreaField
            label="Remarks"
            elementContent={
              <span className="truncate font-normal h-fit [leading-trim:both] [text-edge:cap] leading-none ">
                Lorem ipsum is a dummy text...
              </span>
            }
            isUpdate={isUpdate}
          />
        </ul>

        <div className="h-full"></div>
        <div className="flex justify-end items-center gap-[16px] py-[32px]">
          <button
            onClick={() => setIsUpdate(!isUpdate)}
            className="btn btn-primary px-[16px] text-[20px]  font-semibold"
          >
            <span className="h-[13px] ">
              {!isUpdate ? 'Update' : 'Save Changes'}
            </span>
          </button>
          <label
            htmlFor="my-drawer"
            className="btn btn-outline px-[16px] hover:btn-error text-[20px]  font-semibold"
            onClick={() => setIsUpdate(false)}
          >
            <span className="h-[13px] "> {!isUpdate ? 'Close' : 'Cancel'}</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ItemsSidebar;
