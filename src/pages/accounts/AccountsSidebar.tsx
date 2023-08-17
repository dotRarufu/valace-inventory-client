import SelectField from '../../components/field/SelectField';
import TextInputField from '../../components/field/TextInputField';
import PasswordField from '../../components/field/PasswordField';
import ToggleField from '../../components/field/ToggleField';
import { useContext, useEffect, useState } from 'react';
import { ActivityActionOptions } from '../../../pocketbase-types';
import { useDrawer } from '../../hooks/useDrawer';
import { UserContext } from '../../contexts/UserContext';
import toast from 'react-hot-toast';
import { addAccount, getAccount, updateAccount } from '../../services/accounts';
import { toastSettings } from '../../data/toastSettings';
import { recordActivity } from '../../services/logger';

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

  const { user } = useContext(UserContext)!;
  const [username, setUsername] = useState('test');
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('mypassword');
  const [isActive, setIsActive] = useState(false);
  const [id, setId] = useState('');

  const [initialFields, setInitialFields] = useState<{
    username: string | null;
    isAdmin: boolean | null;
    password: string | null;
    isActive: boolean | null;
  } | null>(null);

  const [shouldRecordChangedFields, setShouldRecordChangedFields] =
    useState(false);

  const [shouldAddAccount, setShouldAddAccount] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  // Record changed fields
  useEffect(() => {
    if (!shouldRecordChangedFields) return;

    const recordChangedFields = async () => {
      if (initialFields && initialFields.username !== username) {
        await recordActivity(ActivityActionOptions['EDIT ACCOUNT USERNAME'], {
          userId: user!.id,
          targetUserId: id,
          oldValue: initialFields.username || undefined,
          newValue: username,
        });
      }

      if (initialFields && initialFields.isAdmin !== isAdmin) {
        await recordActivity(ActivityActionOptions['EDIT ACCOUNT ROLE'], {
          userId: user!.id,
          targetUserId: id,
          oldValue: (initialFields.isAdmin ? 'Admin' : 'Staff') || undefined,
          newValue: isAdmin ? 'Admin' : 'Staff',
        });
      }

      if (initialFields && initialFields.password !== password) {
        await recordActivity(ActivityActionOptions['EDIT ACCOUNT PASSWORD'], {
          userId: user!.id,
          targetUserId: id,
          oldValue: initialFields.password || undefined,
          newValue: password,
        });
      }

      if (initialFields && initialFields.isActive !== isActive) {
        await recordActivity(ActivityActionOptions['EDIT ACCOUNT STATUS'], {
          userId: user!.id,
          targetUserId: id,
          oldValue: initialFields.isActive ? 'Active' : 'Inactive',
          newValue: isActive ? 'Active' : 'Inactive',
        });
      }

      // In case user does not change row id
      setInitialFields({
        isActive,
        isAdmin,
        password,
        username,
      });
      setShouldRecordChangedFields(false);
    };

    void recordChangedFields();
  }, [
    id,
    initialFields,
    isActive,
    isAdmin,
    password,
    shouldRecordChangedFields,
    user,
    username,
  ]);

  // Update account
  useEffect(() => {
    if (!shouldUpdate) return;

    const data = {
      username,
      is_admin: isAdmin,
      plain_password: password,
      is_active: isActive,
    };

    try {
      void updateAccount(activeRowId, data, () => {
        toast.success(`Account ${username} updated`, toastSettings);

        setShouldRecordChangedFields(true);
        setShouldUpdateTable(true);
        setShouldUpdate(false);
      });
    } catch (err) {
      toast.error(`Account not updated`, toastSettings);
    }
  }, [
    activeRowId,
    isActive,
    isAdmin,
    password,
    setShouldUpdateTable,
    shouldUpdate,
    username,
  ]);

  // Get account
  useEffect(() => {
    void getAccount(activeRowId, res => {
      setInitialFields({
        isActive: res.is_active,
        isAdmin: res.is_admin,
        password: res.plain_password,
        username: res.username,
      });
      setUsername(res.username);
      setIsAdmin(res.is_admin);
      setPassword(res.plain_password);
      setIsActive(res.is_active);
      setId(res.id);
    });
  }, [activeRowId]);

  // Add account
  useEffect(() => {
    if (!shouldAddAccount) return;

    const data = {
      username,
      is_admin: isAdmin,
      is_active: isActive,
      plain_password: password,
      password,
      passwordConfirm: password,
    };

    addAccount(data, res => {
      toast.success(`Account ${username} added`, toastSettings);
      setIsDrawerInAdd(false);
      setShouldUpdateTable(true);
      setShouldAddAccount(false);

      // this should never fail
      void recordActivity(ActivityActionOptions['ADD ACCOUNT'], {
        userId: user!.id,
        targetUserId: res.id,
      });
    }).catch(err => {
      toast.error(`Account not added`, toastSettings);
    });
  }, [
    isActive,
    isAdmin,
    password,
    setIsDrawerInAdd,
    setShouldUpdateTable,
    shouldAddAccount,
    user,
    username,
  ]);

  const clearData = () => {
    setInitialFields({
      isActive: false,
      isAdmin: false,
      password: '',
      username: '',
    });
    setUsername('');
    setIsAdmin(false);
    setPassword('');
    setIsActive(false);
    setId('');
  };

  return (
    <div className="drawer-side z-[9999]">
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <div className="flex h-full w-[723px] flex-col gap-[8px] overflow-y-scroll bg-secondary px-[32px] pt-0 font-khula text-secondary-content">
        <div className="flex items-center justify-start pb-[16px]  pt-[32px]">
          <span className="h-[21px] text-[32px] font-semibold leading-none text-primary">
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

        <div className="flex items-center justify-end gap-[16px] py-[32px]">
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
            className="btn-primary btn px-[16px] text-[20px]  font-semibold"
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
            className="btn-outline btn px-[16px] text-[20px] font-semibold  hover:btn-error"
            onClick={() => {
              clearData();
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
