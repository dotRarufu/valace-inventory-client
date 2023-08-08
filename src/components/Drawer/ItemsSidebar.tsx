import TextAreaField from '../Field/TextAreaField';
import TextInputField from '../Field/TextInputField';
import SelectField from '../Field/SelectField';
import ToggleField from '../Field/ToggleField';
import Carousel from './Carousel';
import qrCodeSample from '../../assets/qr.png';
import { useDrawer } from '../../hooks/useDrawer';
import { useContext, useEffect, useState } from 'react';
import pb from '../../lib/pocketbase';
import {
  ActivityActionOptions,
  Collections,
  ItemResponse,
} from '../../../pocketbase-types';
import NumberInputField from '../Field/NumberInputField';
import { recordActivity } from '../../utils/recordActivity';
import { UserContext } from '../../contexts/userContext';
import QrCode from '../Items/QrCode';
import { generateSerialNumber } from '../../utils/generateSerialNumber';

const ItemsSidebar = () => {
  const { user } = useContext(UserContext)!;
  const {
    isDrawerInEdit,
    setIsDrawerInEdit,
    activeRowId,
    setShouldUpdateTable,
    isDrawerInAdd,
    setIsDrawerInAdd,
    drawerRef,
  } = useDrawer()!;
  const [type, setType] = useState<'Furniture' | 'Office' | 'IT'>('Furniture');
  const [isAvailable, setIsAvailable] = useState(false);
  const [propertyNumber, setPropertyNumber] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [location, setLocation] = useState('');
  const [supplier, setSupplier] = useState('');
  const [dateAdded, setDateAdded] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [remarks, setRemarks] = useState('');

  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [shouldAddItem, setShouldAddItem] = useState(false);
  const [shouldRecordChangedFields, setShouldRecordChangedFields] =
    useState(false);
  const [initialFields, setInitialFields] = useState<{
    type: 'Furniture' | 'Office' | 'IT';
    isAvailable: boolean | null;

    name: string | null;
    quantity: number | null;
    location: string | null;
    supplier: string | null;

    propertyNumber: string | null;
    remarks: string | null;
  } | null>(null);
  const [itemResponse, setItemResponse] = useState<ItemResponse | null>(null);
  const [shouldUpdateItemResponse, setShouldUpdateItemResponse] =
    useState(true);

  // Record changed fields
  useEffect(() => {
    if (!shouldRecordChangedFields) return;

    const recordChangedFields = async () => {
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
      if (initialFields && initialFields.location !== location) {
        await recordActivity(ActivityActionOptions['EDIT LOCATION'], {
          userId: user!.id,
          itemId: activeRowId,
          oldValue: initialFields.location || undefined,
          newValue: location,
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

      if (initialFields && initialFields.isAvailable !== isAvailable) {
        await recordActivity(ActivityActionOptions['EDIT ACCOUNT STATUS'], {
          userId: user!.id,
          itemId: activeRowId,
          oldValue: initialFields.isAvailable ? 'Available' : 'Unavailable',
          newValue: initialFields.isAvailable ? 'Available' : 'Unavailable',
        });
      }

      // In case user does not change row id
      setInitialFields({
        type,
        isAvailable,

        name,
        quantity,
        location,
        supplier,

        propertyNumber,
        remarks,
      });
      setShouldRecordChangedFields(false);
    };

    void recordChangedFields();
  }, [
    activeRowId,
    dateAdded,
    initialFields,
    isAvailable,
    location,
    name,
    propertyNumber,
    quantity,
    remarks,
    serialNumber,
    shouldRecordChangedFields,
    supplier,
    type,
    user,
  ]);

  // Get accounts row
  useEffect(() => {
    const getAccountRow = async () => {
      // fixes the bug, try removing this when accounts is all done
      // like in accounts sidebar
      if (activeRowId === '') return;

      const res = await pb
        .collection(Collections.Item)
        .getOne<ItemResponse>(activeRowId);

      setItemResponse(res);
      setPropertyNumber(res.property_number);
      setName(res.name);
      setQuantity(res.quantity);
      setLocation(res.location);
      setSupplier(res.supplier);
      setDateAdded(res.created);
      setSerialNumber(res.serial_number);
      setRemarks(res.remarks);
      setType(res.type);
      setShouldUpdateItemResponse(false);
      setInitialFields({
        type: res.type,
        isAvailable: res.is_available,

        name: res.name,
        quantity: res.quantity,
        location: res.location,
        supplier: res.supplier,

        propertyNumber: res.property_number,
        remarks: res.remarks,
      });
    };

    void getAccountRow();
  }, [activeRowId]);

  // Get accounts row on shouldUpdateData
  useEffect(() => {
    if (!shouldUpdateItemResponse) return;

    const getAccountRow = async () => {
      // fixes the bug, try removing this when accounts is all done
      // like in accounts sidebar
      if (activeRowId === '') return;

      const res = await pb
        .collection(Collections.Item)
        .getOne<ItemResponse>(activeRowId);

      setItemResponse(res);
      setPropertyNumber(res.property_number);
      setName(res.name);
      setQuantity(res.quantity);
      setLocation(res.location);
      setSupplier(res.supplier);
      setDateAdded(res.created);
      setSerialNumber(res.serial_number);
      setRemarks(res.remarks);
      setType(res.type);
      setShouldUpdateItemResponse(false);
      setInitialFields({
        type: res.type,
        isAvailable: res.is_available,

        name: res.name,
        quantity: res.quantity,
        location: res.location,
        supplier: res.supplier,

        propertyNumber: res.property_number,
        remarks: res.remarks,
      });
    };

    void getAccountRow();
  }, [activeRowId, shouldUpdateItemResponse]);

  // Update item
  useEffect(() => {
    if (!shouldUpdate) return;

    const updateItem = async () => {
      const data = {
        property_number: propertyNumber,
        name,
        quantity,
        type,
        is_available: isAvailable,
        location,
        supplier,
        remarks,
      };
      await pb.collection(Collections.Item).update(activeRowId, data);
      setShouldRecordChangedFields(true);
      setShouldUpdateTable(true);
      setShouldUpdate(false);
    };

    void updateItem();
  }, [
    activeRowId,
    isAvailable,
    location,
    name,
    propertyNumber,
    quantity,
    remarks,
    setShouldUpdateTable,
    shouldUpdate,
    supplier,
    type,
  ]);

  // Add item
  useEffect(() => {
    if (!shouldAddItem) return;

    const addItem = async () => {
      const items = await pb.collection(Collections.Item).getFullList({
        fields: 'id',
      });

      const data = {
        property_number: propertyNumber,
        name,
        quantity,
        type,
        is_available: isAvailable,
        location,
        supplier,
        remarks,
        serial_number: generateSerialNumber(items.length),
      };

      const res = await pb.collection(Collections.Item).create(data);
      await recordActivity(ActivityActionOptions['ADD ITEM'], {
        userId: user!.id,
        itemId: res.id,
      });
      setShouldUpdateTable(true);
      setShouldAddItem(false);
    };

    void addItem();
  }, [
    activeRowId,
    isAvailable,
    location,
    name,
    propertyNumber,
    quantity,
    remarks,
    setShouldUpdateTable,
    shouldAddItem,
    shouldUpdate,
    supplier,
    type,
    user,
  ]);

  const clearData = () => {
    console.log("clear data runs");
    setItemResponse(null);
    setPropertyNumber('');
    setName('');
    setQuantity(0);
    setLocation('');
    setSupplier('');
    setDateAdded('');
    setSerialNumber('');
    setRemarks('');
    setType('IT');
   
    setInitialFields({
      type: 'IT',
      isAvailable: false,

      name: '',
      quantity: 0,
      location: '',
      supplier: '',

      propertyNumber: '',
      remarks: '',
    });

  }

  return (
    <div className="drawer-side z-[9999]">
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <div className="px-[32px] w-[723px] pt-0 h-full bg-secondary text-secondary-content font-khula flex flex-col gap-[8px] overflow-y-scroll">
        <div className="flex justify-start pt-[32px] pb-[16px]  items-center">
          <span className="font-semibold h-[21px] text-[32px] leading-none text-primary">
            Item Details
          </span>
        </div>

        <Carousel
          isUpdate={isDrawerInEdit}
          data={itemResponse}
          setShouldUpdateData={setShouldUpdateItemResponse}
        />

        <ul>
          <TextInputField
            label="Property Number"
            value={propertyNumber}
            isUpdate={isDrawerInEdit || isDrawerInAdd}
            handleChange={setPropertyNumber}
          />
          <TextInputField
            label="Name"
            value={name}
            isUpdate={isDrawerInEdit || isDrawerInAdd}
            handleChange={setName}
          />
          <NumberInputField
            label="Quantity"
            value={quantity}
            isUpdate={isDrawerInEdit || isDrawerInAdd}
            handleChange={setQuantity}
          />
          <SelectField
            label="Type"
            value={type}
            dropdown={[
              { label: 'Furniture', callback: () => setType('Furniture') },
              { label: 'Office', callback: () => setType('Office') },
              { label: 'IT', callback: () => setType('IT') },
            ]}
            isUpdate={isDrawerInEdit || isDrawerInAdd}
          />
          <ToggleField
            label="Status"
            value={isAvailable}
            labelValues={{
              checked: 'AVAILABLE',
              unchecked: 'UNAVAILABLE',
            }}
            isUpdate={isDrawerInEdit || isDrawerInAdd}
            handleChange={setIsAvailable}
          />
          <TextInputField
            label="Location"
            value={location}
            isUpdate={isDrawerInEdit || isDrawerInAdd}
            handleChange={setLocation}
          />
          <TextInputField
            label="Supplier"
            value={supplier}
            isUpdate={isDrawerInEdit || isDrawerInAdd}
            handleChange={setSupplier}
          />
          {!isDrawerInEdit && !isDrawerInAdd && (
            <>
              <TextInputField label="Date Added" value={dateAdded} />
              <TextInputField label="Serial Number" value={serialNumber} />
            </>
          )}

          <TextAreaField
            label="Remarks"
            value={remarks}
            isUpdate={isDrawerInEdit || isDrawerInAdd}
            // <span className="truncate font-normal h-fit [leading-trim:both] [text-edge:cap] leading-none ">
            // </span>
            handleChange={setRemarks}
          />
        </ul>

        <div className="h-full"></div>

        {/* <QrCodeModal /> */}

        {!isDrawerInEdit && !isDrawerInAdd && <QrCode />}

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
                setShouldAddItem(true);
              }
            }}
            className="btn btn-primary px-[16px] text-[20px]  font-semibold"
          >
            <span className="h-[13px] ">
              {isDrawerInEdit
                ? 'Save Changes'
                : isDrawerInAdd
                ? 'Add Item'
                : 'Update'}
            </span>
          </button>
          <label
            htmlFor="my-drawer"
            className="btn btn-outline px-[16px] hover:btn-error text-[20px]  font-semibold"
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

export default ItemsSidebar;
