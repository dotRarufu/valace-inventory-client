import SelectField from '../Field/SelectField';
import TextInputField from '../Field/TextInputField';
import PasswordField from '../Field/PasswordField';
import ToggleField from '../Field/ToggleField';
import { useEffect, useRef, useState } from 'react';
import pb from '../../lib/pocketbase';
import { Collections, UserResponse } from '../../../pocketbase-types';
import { useDrawer } from '../../hooks/useDrawer';

const AccountsSidebar = () => {
  const {
    isDrawerInEdit,
    setIsDrawerInEdit,
    activeRowId,
    setShouldUpdateTable,
    isDrawerInAdd,
    setIsDrawerInAdd,
    drawerRef,
  } = useDrawer()!;

  // const cancelLabelRef = useRef<HTMLLabelElement>(null);
  const confirmLabelRef = useRef<HTMLLabelElement>(null);
  const [username, setUsername] = useState('test');
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('mypassword');
  const [isActive, setIsActive] = useState(false);
  const [id, setId] = useState('');

  const [shouldAddAccount, setShouldAddAccount] = useState(false);
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

      console.log('res:', res);
      console.log('activeRowId:', activeRowId);

      setUsername(res.username);
      setIsAdmin(res.is_admin);
      setPassword(res.plain_password);
      setIsActive(res.is_active);
      setId(res.id);
    };

    void getAccountRow();
  }, [activeRowId]);

  useEffect(() => {
    if (!shouldAddAccount) return;

    const addAccount = async () => {
      const data = {
        username,
        is_admin: isAdmin,
        is_active: isActive,
        plain_password: password,
        password,
        passwordConfirm: password,
      };
      await pb.collection(Collections.User).create(data);

      setIsDrawerInAdd(false);
      setShouldUpdateTable(true);
      setShouldAddAccount(false);
    };

    void addAccount();
  }, [
    isActive,
    isAdmin,
    password,
    setIsDrawerInAdd,
    setShouldUpdateTable,
    shouldAddAccount,
    username,
  ]);

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
            // todo: update the prop name
            isUpdate={isDrawerInEdit || isDrawerInAdd}
            handleChange={setUsername}
          />
          <SelectField
            label="Role"
            value={isAdmin ? 'Admin' : 'Staff'}
            dropdown={[
              { label: 'Admin', callback: () => setIsAdmin(true) },
              { label: 'Staff', callback: () => setIsAdmin(false) },
            ]}
            isUpdate={isDrawerInEdit || isDrawerInAdd}
          />
          {!isDrawerInEdit && !isDrawerInAdd && (
            <TextInputField label="Created At" value="07/23/2023" />
          )}
          <PasswordField
            label="Password"
            value={password}
            isUpdate={isDrawerInEdit || isDrawerInAdd}
            handleChange={setPassword}
          />

          {!isDrawerInEdit && !isDrawerInAdd && (
            <TextInputField label="UID" value={id} />
          )}

          <ToggleField
            label="Status"
            value={isActive}
            labelValues={{
              checked: 'ACTIVE',
              unchecked: 'INACTIVE',
            }}
            isUpdate={isDrawerInEdit || isDrawerInAdd}
            handleChange={setIsActive}
          />
        </ul>

        <div className="h-full"></div>

        {/* <QrCodeModal /> */}

        <div className="flex justify-end items-center gap-[16px] py-[32px]">
          <button
            onClick={() => {
              if (!isDrawerInEdit) {
                setIsDrawerInEdit(true);
              }

              if (isDrawerInEdit) {
                if (drawerRef && drawerRef.current) {
                  drawerRef.current.checked = false;
                }

                setIsDrawerInAdd(false);
                setShouldUpdate(true);
              }

              if (isDrawerInAdd) {
                if (drawerRef && drawerRef.current) {
                  drawerRef.current.checked = false;
                }
                setIsDrawerInAdd(false);
                setShouldAddAccount(true);
              }
            }}
            className="btn btn-primary px-[16px] text-[20px]  font-semibold"
          >
            <span className="h-[13px] ">
              {isDrawerInEdit
                ? 'Save Changes'
                : isDrawerInAdd
                ? 'Add Account'
                : 'Update'}
            </span>
          </button>
          <label
            htmlFor="my-drawer"
            className="btn btn-outline px-[16px] hover:btn-error text-[20px]  font-semibold"
            onClick={() => {
              setIsDrawerInEdit(false);
              setIsDrawerInAdd(false);
            }}
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
