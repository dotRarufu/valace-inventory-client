import SelectField from '../Field/SelectField';
import TextInputField from '../Field/TextInputField';
import PasswordField from '../Field/PasswordField';
import ToggleField from '../Field/ToggleField';
import { useEffect, useRef, useState } from 'react';
import pb from '../../lib/pocketbase';
import {
  Collections,
  UserRecord,
  UserResponse,
} from '../../../pocketbase-types';

type Props = {
  isDrawerInEdit: boolean;
  setIsDrawerInEdit: React.Dispatch<React.SetStateAction<boolean>>;
  activeRowId: string;
  setShouldUpdateTable: React.Dispatch<React.SetStateAction<boolean>>;
};

const AccountsSidebar = ({
  isDrawerInEdit,
  setIsDrawerInEdit,
  activeRowId,
  setShouldUpdateTable,
}: Props) => {
  const labelRef = useRef<HTMLLabelElement>(null);
  const [username, setUsername] = useState('test');
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('mypassword');
  const [isActive, setIsActive] = useState(false);

  const [shouldUpdate, setShouldUpdate] = useState(false);

  useEffect(() => {
    if (!shouldUpdate) return;

    const updateAccount = async () => {
      const data = {
        username,
        is_admin: isAdmin,
        plain_password: password,
        is_active: isActive,
      };
      const res = await pb
        .collection(Collections.User)
        .update(activeRowId, data);

      setShouldUpdateTable(true);
      setShouldUpdate(false);
    };

    void updateAccount();
  }, [
    activeRowId,
    isActive,
    isAdmin,
    password,
    setShouldUpdateTable,
    shouldUpdate,
    username,
  ]);

  useEffect(() => {
    const getAccountRow = async () => {
      const res = await pb
        .collection(Collections.User)
        .getOne<UserResponse>(activeRowId);

      setUsername(res.username);
      setIsAdmin(res.is_admin);
      setPassword(res.plain_password);
      setIsActive(res.is_active);
    };

    void getAccountRow();
  }, [activeRowId]);

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
            stringContent={username}
            isUpdate={isDrawerInEdit}
            handleChange={setUsername}
          />
          <SelectField
            label="Role"
            stringContent={isAdmin ? 'Admin' : 'Staff'}
            handleChange={setIsAdmin}
            dropdown={[{ label: 'Admin' }, { label: 'Staff' }]}
            isUpdate={isDrawerInEdit}
          />
          {!isDrawerInEdit && (
            <TextInputField label="Created At" stringContent="07/23/2023" />
          )}
          <PasswordField
            label="Password"
            stringContent={password}
            isUpdate={isDrawerInEdit}
            handleChange={setPassword}
          />

          {!isDrawerInEdit && (
            <TextInputField
              label="UID"
              stringContent="550e8400-e29b-41d4-a716-446655440000"
              isUpdate={isDrawerInEdit}
            />
          )}

          <ToggleField
            label="Status"
            stringContent={isActive}
            values={{
              checkedLabel: 'ACTIVE',
              uncheckedLabel: 'INACTIVE',
            }}
            isUpdate={isDrawerInEdit}
            handleChange={setIsActive}
          />
        </ul>

        <div className="h-full"></div>

        {/* <QrCodeModal /> */}

        <div className="flex justify-end items-center gap-[16px] py-[32px]">
          <button
            onClick={() => {
              if (isDrawerInEdit) {
                labelRef?.current?.click();
              }

              setIsDrawerInEdit(!isDrawerInEdit);

              if (isDrawerInEdit) {
                setShouldUpdate(true);
              }
            }}
            className="btn btn-primary px-[16px] text-[20px]  font-semibold"
          >
            <span className="h-[13px] ">
              {!isDrawerInEdit ? 'Update' : 'Save Changes'}
            </span>
          </button>
          <label
            htmlFor="my-drawer"
            ref={labelRef}
            className="btn btn-outline px-[16px] hover:btn-error text-[20px]  font-semibold"
            onClick={() => setIsDrawerInEdit(false)}
          >
            <span className="h-[13px] ">
              {!isDrawerInEdit ? 'Close' : 'Cancel'}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default AccountsSidebar;
