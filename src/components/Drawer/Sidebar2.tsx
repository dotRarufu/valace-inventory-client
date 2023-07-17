import { useState } from 'react';
import SelectField from '../Field/SelectField';
import TextAreaField from '../Field/TextAreaField';
import TextInputField from '../Field/TextInputField';
import ToggleField from '../Field/ToggleField';
import PasswordField from '../Field/PasswordField';

const Sidebar2 = () => {
  const [isUpdate, setIsUpdate] = useState(false);

  return (
    <div className="drawer-side z-[9999]">
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <div className="px-[32px] w-[723px] pt-0 h-full bg-secondary text-secondary-content font-khula flex flex-col gap-[8px] overflow-y-scroll">
        <div className="flex justify-start pt-[32px] pb-[16px]  items-center">
          <span className="font-semibold h-[21px] text-[32px] leading-none text-primary">
            Account Details
          </span>
        </div>

        <ul>
          <TextInputField
            label="Username"
            stringContent="admin01"
            isUpdate={isUpdate}
          />
          <SelectField
            label="Role"
            elementContent={
              <span className="badge h-fit text-[20px] bg-[#4A000D] text-secondary py-[4px] px-[24px] -translate-y-[12.5%] ">
                <span className="h-[13px] leading-none uppercase">Admin</span>
              </span>
            }
            dropdown={[{ label: 'Admin' }, { label: 'Staff' }]}
            isUpdate={isUpdate}
          />
          {!isUpdate && (
            <TextInputField
              label="Created At"
              stringContent="07/23/2023"
              isUpdate={isUpdate}
            />
          )}
          <PasswordField
            label="Password"
            stringContent="•••••••••••"
            isUpdate={isUpdate}
          />

          {!isUpdate && (
            <TextInputField
              label="UID"
              stringContent="550e8400-e29b-41d4-a716-446655440000"
              isUpdate={isUpdate}
            />
          )}

          <ToggleField
            label="Status"
            elementContent={
              <a className="text-success text-[24px] font-semibold uppercase h-[16px] leading-none">
                ACTIVE
              </a>
            }
            values={{
              checkedLabel: 'ACTIVE',
              uncheckedLabel: 'INACTIVE',
            }}
            initialIsChecked={true}
            isUpdate={isUpdate}
          />
        </ul>

        <div className="h-full"></div>

        {/* <QrCodeModal /> */}

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

export default Sidebar2;
