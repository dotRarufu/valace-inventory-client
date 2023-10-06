import SelectField from '../../components/field/SelectField';
import TextInputField from '../../components/field/TextInputField';
import PasswordField from '../../components/field/PasswordField';
import ToggleField from '../../components/field/ToggleField';
import { useCallback, useContext, useEffect, useState } from 'react';
import { ActivityActionOptions } from '../../../pocketbase-types';
import { useDrawer } from '../../hooks/useDrawer';
import { UserContext } from '../../contexts/UserContext';
import toast from 'react-hot-toast';
import { addAccount, getAccount, updateAccount } from '../../services/accounts';
import { toastSettings } from '../../data/toastSettings';
import { recordActivity } from '../../services/logger';
import { PocketbaseError } from '../../types/PocketbaseError';
import TextAreaField from '../../components/field/TextAreaField';

const initialFieldValues = {
  username: 'test',
  isAdmin: false,
  password: 'mypassword',
  isActive: false,
};

type Fields = {
  username: string;
  isAdmin: boolean;
  password: string;
  isActive: boolean;
};

const RequestsSidebar = () => {
  const { state, activeRowId, setShouldUpdateTable, drawerRef, setState } =
    useDrawer()!;
  const { user } = useContext(UserContext)!;

  const [id, setId] = useState('');
  const [fields, setfields] = useState(initialFieldValues);
  const { username, isAdmin, password, isActive } = fields;
  const [shouldRefetchData, setShouldRefetchData] = useState(false);
  const [initialFields, setInitialFields] = useState<Fields | null>(null);

  // Get account
  useEffect(() => {
    getAccount(activeRowId, res => {
      const newFields = {
        isActive: res.is_active,
        isAdmin: res.is_admin,
        password: res.plain_password,
        username: res.username,
      };
      setInitialFields(newFields);
      setfields(newFields);

      setId(res.id);
    }).catch(err => {
      const error = err as PocketbaseError;
      const errorFields = Object.keys(error.data.data);
      const field =
        errorFields[0].charAt(0).toUpperCase() + errorFields[0].slice(1);
      const message = `${field} - ${error.data.data[errorFields[0]].message}`;

      toast.error(message, toastSettings);
    });
  }, [activeRowId]);

  // important to be separated
  // Get account on update
  useEffect(() => {
    if (!shouldRefetchData) return;

    getAccount(activeRowId, res => {
      const newFields = {
        isActive: res.is_active,
        isAdmin: res.is_admin,
        password: res.plain_password,
        username: res.username,
      };
      setInitialFields(newFields);
      setfields(newFields);
      setId(res.id);

      setShouldRefetchData(false);
    }).catch(err => {
      const error = err as PocketbaseError;
      const errorFields = Object.keys(error.data.data);
      const field =
        errorFields[0].charAt(0).toUpperCase() + errorFields[0].slice(1);
      const message = `${field} - ${error.data.data[errorFields[0]].message}`;

      toast.error(message, toastSettings);
    });
  }, [activeRowId, shouldRefetchData]);

  const recordChangedFields = async () => {
    const { username, isActive, isAdmin, password } = fields;

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
  };

  const handleUpdateAccount = () => {
    const data = {
      username,
      is_admin: isAdmin,
      plain_password: password,
      is_active: isActive,
    };

    updateAccount(activeRowId, data, () => {
      toast.success(`Account ${username} updated`, toastSettings);

      void recordChangedFields();
      setShouldUpdateTable(true);
    }).catch(err => {
      const error = err as PocketbaseError;
      const errorFields = Object.keys(error.data.data);
      const field =
        errorFields[0].charAt(0).toUpperCase() + errorFields[0].slice(1);
      const message = `${field} - ${error.data.data[errorFields[0]].message}`;

      toast.error(message, toastSettings);
    });
  };

  const clearData = useCallback(() => {
    setInitialFields({
      isActive: false,
      isAdmin: false,
      password: '',
      username: '',
    });

    const defaultFields = {
      username: '',
      isAdmin: false,
      password: '',
      isActive: false,
    };

    setfields(defaultFields);
    setId('');
  }, []);

  const handleAddAccount = async () => {
    try {
      const data = {
        username,
        is_admin: isAdmin,
        is_active: isActive,
        plain_password: password,
        password,
        passwordConfirm: password,
      };

      const res = await addAccount(data);
      toast.success(`Account ${username} added`, toastSettings);

      setShouldUpdateTable(true);

      // This should never fail
      void recordActivity(ActivityActionOptions['ADD ACCOUNT'], {
        userId: user!.id,
        targetUserId: res.id,
      });
      clearData();
    } catch (err) {
      const error = err as PocketbaseError;
      const errorFields = Object.keys(error.data.data);
      const field =
        errorFields[0].charAt(0).toUpperCase() + errorFields[0].slice(1);
      const message = `${field} - ${error.data.data[errorFields[0]].message}`;

      toast.error(message, toastSettings);
    }
  };

  // When to clear data
  useEffect(() => {
    if (activeRowId === '') return;

    if (state === 'inAdd') clearData();
  }, [activeRowId, clearData, state]);

  return (
    <div className="drawer-side z-[9999]">
      <label
        onClick={() => {
          drawerRef!.current!.click();

          if (state === 'inAdd') setShouldRefetchData(true);
        }}
        className="drawer-overlay"
      />
      <div className="flex h-full w-[723px] flex-col gap-[8px] overflow-y-scroll bg-secondary px-[32px] pt-0 font-khula text-secondary-content">
        <div className="flex items-center justify-start pb-[16px]  pt-[32px]">
          <span className="h-[21px] text-[32px] font-semibold leading-none text-primary">
            Request Details
          </span>
        </div>

        <ul>
          <TextInputField
            label="Office"
            value={username}
            // todo: update the prop name
            isUpdate={state !== null}
            handleChange={username => setfields(old => ({ ...old, username }))}
          />
          <TextInputField
            label="Item"
            value={username}
            // todo: update the prop name
            isUpdate={state !== null}
            handleChange={username => setfields(old => ({ ...old, username }))}
          />
          <TextInputField
            label="Amount"
            value={username}
            // todo: update the prop name
            isUpdate={state !== null}
            handleChange={username => setfields(old => ({ ...old, username }))}
          />
          <TextInputField
            label="Unit"
            value={username}
            // todo: update the prop name
            isUpdate={state !== null}
            handleChange={username => setfields(old => ({ ...old, username }))}
          />
          <TextAreaField
            label="Description"
            value={username}
            isUpdate={state !== null}
            // <span className="truncate font-normal h-fit [leading-trim:both] [text-edge:cap] leading-none ">
            // </span>
            handleChange={username => setfields(old => ({ ...old, username }))}
          />
          <TextInputField
            value={username}
            label="Tag"
            isUpdate={state !== null}
            handleChange={username => setfields(old => ({ ...old, username }))}
          />
          {/* <SelectField
            label="Role"
            value={isAdmin ? 'Admin' : 'Staff'}
            dropdown={[
              {
                label: 'Admin',
                callback: () => setfields(old => ({ ...old, isAdmin: true })),
              },
              {
                label: 'Staff',
                callback: () => setfields(old => ({ ...old, isAdmin: false })),
              },
            ]}
            isUpdate={state !== null}
          />
          {state === 'inEdit' && (
            <TextInputField label="Created At" value="07/23/2023" />
          )}
          <PasswordField
            label="Password"
            value={password}
            isUpdate={state !== null}
            handleChange={password => setfields(old => ({ ...old, password }))}
          /> */}

          <ToggleField
            label="Status"
            value={isActive}
            labelValues={{
              checked: 'ACTIVE',
              unchecked: 'INACTIVE',
            }}
            isUpdate={state !== null}
            handleChange={isActive => setfields(old => ({ ...old, isActive }))}
          />
        </ul>

        <div className="h-full"></div>

        <div className="flex items-center justify-end gap-[16px] py-[32px]">
          {/* <button
            onClick={() => {
              if (state === 'inEdit') {
                drawerRef!.current!.checked = false;

                setState(null);
                handleUpdateAccount();

                return;
              }

              if (state === 'inAdd') {
                drawerRef!.current!.checked = false;

                setState(null);
                void handleAddAccount();

                return;
              }

              setState('inEdit');
            }}
            className="btn-primary btn px-[16px] text-[20px]  font-semibold"
          >
            <span className="h-[13px] ">
              {state === 'inEdit'
                ? 'Save Changes'
                : state === 'inAdd'
                ? 'Add Account'
                : 'Update'}
            </span>
          </button> */}
          <label
            className="btn-outline btn px-[16px] text-[20px] font-semibold  hover:btn-error"
            onClick={() => {
              drawerRef!.current!.click();

              if (state === 'inAdd') setShouldRefetchData(true);
            }}
          >
            <span className="h-[13px] ">
              {state !== 'inEdit' ? 'Close' : 'Cancel'}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default RequestsSidebar;
