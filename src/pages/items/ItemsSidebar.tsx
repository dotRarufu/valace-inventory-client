import TextAreaField from '../../components/field/TextAreaField';
import TextInputField from '../../components/field/TextInputField';
import SelectField from '../../components/field/SelectField';
import ToggleField from '../../components/field/ToggleField';
import Carousel from '../../components/carousel/Carousel';
import { useDrawer } from '../../hooks/useDrawer';
import { useCallback, useContext, useEffect, useState } from 'react';
import {
  ActivityActionOptions,
  ItemRecord,
  ItemResponse,
  ItemTypeOptions,
} from '../../../pocketbase-types';
import NumberInputField from '../../components/field/NumberInputField';
import { UserContext } from '../../contexts/UserContext';
import { toast } from 'react-hot-toast';
import QrCode from './QrCode';
import { qrCode } from '../../services/qrCodeStyling';
import { recordActivity } from '../../services/logger';
import {
  ItemUpdate,
  createItem,
  getItem,
  updateItem,
} from '../../services/item';
import generateSerialNumber from './utils/generateSerialNumber';
import { increaseRowCount } from './utils/increaseRowCount';
import { toastSettings } from '../../data/toastSettings';
import { PocketbaseError } from '../../types/PocketbaseError';
import { getBaseUrl } from '../../utils/getBaseUrl';

type Fields = {
  type: ItemTypeOptions;
  total: number;
  unit: string;
  propertyNumber: string;
  name: string;
  quantity: number;
  supplier: string;
  dateAdded: string;
  serialNumber: string;
  remarks: string;
};

const initialFieldValues = {
  isAvailable: false,
  dateAdded: '',
  total: 0,
  unit: '',
  name: '',
  propertyNumber: '',
  quantity: 0,
  remarks: '',
  serialNumber: '',
  supplier: '',
  type: ItemTypeOptions.Furniture,
};

const ItemsSidebar = () => {
  const { user } = useContext(UserContext)!;
  const { setState, activeRowId, setShouldUpdateTable, state, drawerRef } =
    useDrawer()!;

  const [fields, setFields] = useState<Fields>(initialFieldValues);

  const {
    dateAdded,
    total,
    unit,
    name,
    propertyNumber,
    quantity,
    remarks,
    serialNumber,
    supplier,
    type,
  } = fields;

  const [shouldRefetchData, setShouldRefetchData] = useState(false);

  // for recording changed fields
  const [initialFields, setInitialFields] = useState<Fields | null>(null);
  const [itemResponse, setItemResponse] = useState<ItemResponse | null>(null);
  // for carousel
  const [shouldUpdateItemResponse, setShouldUpdateItemResponse] =
    useState(true);

  // Record changed fields
  const recordChangedFields = async () => {
    // Does not destructure the state in dependency array
    const {
      dateAdded,
      total,
      unit,
      name,
      propertyNumber,
      quantity,
      remarks,
      serialNumber,
      supplier,
      type,
    } = fields;
    if (initialFields && initialFields.type !== type) {
      await recordActivity(ActivityActionOptions['EDIT TYPE'], {
        userId: user!.id,
        itemId: activeRowId,
        oldValue: initialFields.type,
        newValue: type,
      });
    }
    if (initialFields && initialFields.name !== name) {
      await recordActivity(ActivityActionOptions['EDIT NAME'], {
        userId: user!.id,
        itemId: activeRowId,
        oldValue: initialFields.name || undefined,
        newValue: name,
      });
    }
    if (initialFields && initialFields.quantity !== quantity) {
      await recordActivity(ActivityActionOptions['EDIT QUANTITY'], {
        userId: user!.id,
        itemId: activeRowId,
        oldValue: initialFields?.quantity?.toString() || undefined,
        newValue: quantity.toString(),
      });
    }

    if (initialFields && initialFields.supplier !== supplier) {
      await recordActivity(ActivityActionOptions['EDIT SUPPLIER'], {
        userId: user!.id,
        itemId: activeRowId,
        oldValue: initialFields.supplier || undefined,
        newValue: supplier,
      });
    }
    if (initialFields && initialFields.propertyNumber !== propertyNumber) {
      await recordActivity(ActivityActionOptions['EDIT PROPERTY NUMBER'], {
        userId: user!.id,
        itemId: activeRowId,
        oldValue: initialFields.propertyNumber || undefined,
        newValue: propertyNumber,
      });
    }
    if (initialFields && initialFields.remarks !== remarks) {
      await recordActivity(ActivityActionOptions['EDIT REMARKS'], {
        userId: user!.id,
        itemId: activeRowId,
        oldValue: initialFields.remarks || undefined,
        newValue: remarks,
      });
    }
    // todo: update activity table
    if (initialFields && initialFields.total !== total) {
      await recordActivity(ActivityActionOptions['EDIT TOTAL'], {
        userId: user!.id,
        itemId: activeRowId,
        oldValue: initialFields.total.toString() || undefined,
        newValue: total.toString(),
      });
    }
    if (initialFields && initialFields.unit !== unit) {
      await recordActivity(ActivityActionOptions['EDIT UNIT'], {
        userId: user!.id,
        itemId: activeRowId,
        oldValue: initialFields.unit || undefined,
        newValue: unit,
      });
    }

    // In case user does not change row id
    setInitialFields({
      type,
      name,
      quantity,
      total,
      unit,
      supplier,
      propertyNumber,
      remarks,
      dateAdded,
      serialNumber,
    });
  };

  // Get accounts row
  useEffect(() => {
    const getAccountRow = async () => {
      // fixes the bug, try removing this when accounts is all done
      // like in accounts sidebar
      if (activeRowId === '') return;

      const res = await getItem(activeRowId);

      setItemResponse(res);

      const newFields = {
        propertyNumber: res.property_number,
        name: res.name,
        quantity: res.quantity,
        total: res.total,
        unit: res.unit,
        supplier: res.supplier,
        dateAdded: res.created,
        serialNumber: res.serial_number,
        remarks: res.remarks,
        type: res.type,
      };

      setFields(newFields);
      setShouldUpdateItemResponse(false);
      setInitialFields(newFields);
    };

    void getAccountRow();
  }, [activeRowId]);

  // Get item row on shouldUpdateData
  // important to be separated
  useEffect(() => {
    const getItemRow = async () => {
      // fixes the bug, try removing this when accounts is all done
      // like in accounts sidebar
      if (activeRowId === '') return;

      const res = await getItem(activeRowId);

      setItemResponse(res);

      const newFields = {
        propertyNumber: res.property_number,
        name: res.name,
        quantity: res.quantity,
        total: res.total,
        unit: res.unit,
        supplier: res.supplier,
        dateAdded: res.created,
        serialNumber: res.serial_number,
        remarks: res.remarks,
        type: res.type,
      };

      setFields(newFields);
      setShouldUpdateItemResponse(false);
      setInitialFields({
        type: res.type,

        name: res.name,
        quantity: res.quantity,
        total: res.total,
        unit: res.unit,
        supplier: res.supplier,
        dateAdded: res.created,
        serialNumber: res.serial_number,
        propertyNumber: res.property_number,
        remarks: res.remarks,
      });
      setShouldRefetchData(false);
    };

    if (shouldUpdateItemResponse || shouldRefetchData) {
      void getItemRow();
    }
  }, [activeRowId, shouldRefetchData, shouldUpdateItemResponse]);

  const handleUpdateItem = () => {
    const data: ItemUpdate = {
      property_number: propertyNumber,
      name,
      quantity,
      type,
      total,
      unit,
      supplier,
      remarks,
    };
    updateItem(activeRowId, data)
      .then(() => recordChangedFields())
      .then(() => {
        setShouldUpdateTable(true);

        toast.success(`Item ${name} updated`, toastSettings);
      })
      .catch(err => {
        const error = err as PocketbaseError;
        const errorFields = Object.keys(error.data.data);
        const field =
          errorFields[0].charAt(0).toUpperCase() + errorFields[0].slice(1);
        const message = `${field} - ${error.data.data[errorFields[0]].message}`;

        toast.error(message, toastSettings);
      });
  };

  const clearData = useCallback(() => {
    setItemResponse(null);

    setFields(initialFieldValues);
    setInitialFields(initialFieldValues);
  }, []);

  // When to clear data
  useEffect(() => {
    if (activeRowId === '') return;

    if (state === 'inAdd') {
      clearData();
      console.log('cleardata deps:', state);

      return;
    }
  }, [activeRowId, clearData, state]);

  const addItem = async () => {
    try {
      // todo: fix this
      const data: ItemRecord = {
        property_number: propertyNumber,
        name,
        quantity,
        type,
        supplier,
        total,
        unit,
        remarks,
        serial_number: await generateSerialNumber(),
      };

      const res = await createItem(data);
      const newFormData = new FormData();
      const address = getBaseUrl();
      const route = 'user';
      const query = '?id=';

      qrCode.update({
        data: `${address}/${route}${query}${activeRowId}`,
      });

      const file = await qrCode.getRawData();

      if (file === null)
        throw new Error('could not convert qrcoderaw data to blob');

      newFormData.append('qr', file);
      await updateItem(res.id, newFormData);
      await recordActivity(ActivityActionOptions['ADD ITEM'], {
        userId: user!.id,
        itemId: res.id,
      });
      await increaseRowCount('m940ztp5mzi2wlq');
      setShouldUpdateTable(true);
      clearData();
      toast.success(`Item ${name} added`, toastSettings);
    } catch (err) {
      const error = err as PocketbaseError;
      const errorFields = Object.keys(error.data.data);
      const field =
        errorFields[0].charAt(0).toUpperCase() + errorFields[0].slice(1);
      const message = `${field} - ${error.data.data[errorFields[0]].message}`;

      toast.error(message, toastSettings);
    }
  };

  return (
    <div className="drawer-side z-[9999]">
      <label
        onClick={() => {
          drawerRef!.current!.click();

          if (state === 'inAdd') {
            setShouldRefetchData(true);
          }
        }}
        // htmlFor="my-drawer"
        className="drawer-overlay"
      />
      <div className="flex h-full w-[723px] flex-col gap-[8px] overflow-y-scroll bg-secondary px-[32px] pt-0 font-khula text-secondary-content">
        <div className="flex items-center justify-start pb-[16px]  pt-[32px]">
          <span className="h-[21px] text-[32px] font-semibold leading-none text-primary">
            Item Details
          </span>
        </div>

        <Carousel
          isUpdate={state === 'inEdit'}
          data={itemResponse}
          setShouldUpdateData={setShouldUpdateItemResponse}
        />

        <ul>
          <TextInputField
            label="Property Number"
            value={propertyNumber}
            isUpdate={state !== null}
            handleChange={v => {
              setFields(old => ({ ...old, propertyNumber: v }));
            }}
          />
          <TextInputField
            label="Name"
            value={name}
            isUpdate={state !== null}
            handleChange={v => {
              setFields(old => ({ ...old, name: v }));
            }}
          />
          <NumberInputField
            label="Quantity"
            value={quantity}
            isUpdate={state !== null}
            handleChange={v => {
              setFields(old => ({ ...old, quantity: v }));
            }}
          />
          <SelectField
            label="Type"
            value={type}
            dropdown={[
              {
                label: 'Furniture',
                callback: () =>
                  setFields(old => ({
                    ...old,
                    type: ItemTypeOptions.Furniture,
                  })),
              },
              {
                label: 'Office',
                callback: () =>
                  setFields(old => ({ ...old, type: ItemTypeOptions.Office })),
              },
              {
                label: 'IT',
                callback: () =>
                  setFields(old => ({ ...old, type: ItemTypeOptions.IT })),
              },
            ]}
            isUpdate={state !== null}
          />
          {state === null && (
            <ToggleField
              label="Status"
              value={quantity > 0}
              labelValues={{
                checked: 'AVAILABLE',
                unchecked: 'UNAVAILABLE',
              }}
              isUpdate={state !== null}
              handleChange={v => {
                setFields(old => ({ ...old, isAvailable: v }));
              }}
            />
          )}

          <NumberInputField
            label="Total"
            value={total}
            isUpdate={state !== null}
            handleChange={v => {
              setFields(old => ({ ...old, total: v }));
            }}
          />
          <TextInputField
            label="Unit"
            value={unit}
            isUpdate={state !== null}
            handleChange={v => {
              setFields(old => ({ ...old, unit: v }));
            }}
          />
          <TextInputField
            label="Supplier"
            value={supplier}
            isUpdate={state !== null}
            handleChange={v => {
              setFields(old => ({ ...old, supplier: v }));
            }}
          />
          {state === null && (
            <>
              <TextInputField label="Date Added" value={dateAdded} />
              <TextInputField label="Serial Number" value={serialNumber} />
            </>
          )}

          <TextAreaField
            label="Remarks"
            value={remarks}
            isUpdate={state !== null}
            // <span className="truncate font-normal h-fit [leading-trim:both] [text-edge:cap] leading-none ">
            // </span>
            handleChange={v => {
              setFields(old => ({ ...old, remarks: v }));
            }}
          />
        </ul>

        <div className="h-full"></div>

        {state === null && <QrCode />}

        <div className="flex items-center justify-end gap-[16px] py-[32px]">
          <button
            onClick={() => {
              if (state === 'inEdit') {
                drawerRef!.current!.checked = false;

                setState(null);
                handleUpdateItem();

                return;
              }

              if (state === 'inAdd') {
                drawerRef!.current!.checked = false;

                setState(null);
                void addItem();

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
                ? 'Add Item'
                : 'Update'}
            </span>
          </button>
          <label
            // htmlFor="my-drawer"
            className="btn-outline btn px-[16px] text-[20px] font-semibold  hover:btn-error"
            onClick={() => {
              drawerRef!.current!.click();

              if (state === 'inAdd') {
                setShouldRefetchData(true);
              }
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

export default ItemsSidebar;
