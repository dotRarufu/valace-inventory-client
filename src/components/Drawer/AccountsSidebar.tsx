import SelectField from '../Field/SelectField';
import TextInputField from '../Field/TextInputField';
import PasswordField from '../Field/PasswordField';
import ToggleField from '../Field/ToggleField';
import { useEffect, useRef, useState } from 'react';
import pb from '../../lib/pocketbase';
import { Collections, UserResponse } from '../../../pocketbase-types';

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
  const [id, setId] = useState('');

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
      await pb.collection(Collections.User).update(activeRowId, data);

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
      setId(res.id);
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
            value={username}
            isUpdate={isDrawerInEdit}
            handleChange={setUsername}
          />
          <SelectField
            label="Role"
            value={isAdmin ? 'Admin' : 'Staff'}
            dropdown={[
              { label: 'Admin', callback: () => setIsAdmin(true) },
              { label: 'Staff', callback: () => setIsAdmin(false) },
            ]}
            isUpdate={isDrawerInEdit}
          />
          {!isDrawerInEdit && (
            <TextInputField label="Created At" value="07/23/2023" />
          )}
          <PasswordField
            label="Password"
            value={password}
            isUpdate={isDrawerInEdit}
            handleChange={setPassword}
          />

          {!isDrawerInEdit && (
            <TextInputField label="UID" value={id} isUpdate={isDrawerInEdit} />
          )}

          <ToggleField
            label="Status"
            value={isActive}
            labelValues={{
              checked: 'ACTIVE',
              unchecked: 'INACTIVE',
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
                setShouldUpdate(true);
              }

              setIsDrawerInEdit(!isDrawerInEdit);
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
