import TextAreaField from '../Field/TextAreaField';
import TextInputField from '../Field/TextInputField';
import SelectField from '../Field/SelectField';
import ToggleField from '../Field/ToggleField';
import Carousel from './Carousel';
import qrCodeSample from '../../assets/qr.png';
import { useDrawer } from '../../hooks/useDrawer';
import { useEffect, useState } from 'react';
import pb from '../../lib/pocketbase';
import { Collections, ItemResponse } from '../../../pocketbase-types';

const ItemsSidebar = () => {
  const { isDrawerInEdit, setIsDrawerInEdit, activeRowId } = useDrawer()!;

  const [type, setType] = useState<'Furniture' | 'Office' | 'IT'>('Furniture');
  const [isAvailable] = useState(false);
  const [propertyNumber, setPropertyNumber] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [location, setLocation] = useState('');
  const [supplier, setSupplier] = useState('');
  const [dateAdded, setDateAdded] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [remarks, setRemarks] = useState('');
  // const [images, setImages] = useState();

  useEffect(() => {
    const getAccountRow = async () => {
      // fixes the bug, try removing this when accounts is all done
      // like in accounts sidebar
      if (activeRowId === '') return;

      const res = await pb
        .collection(Collections.Item)
        .getOne<ItemResponse>(activeRowId);
      console.log('res:', res);
      console.log('activeRowId:', activeRowId);

      setPropertyNumber(res.property_number);
      setName(res.name);
      setQuantity(res.quantity);
      setLocation(res.location);
      setSupplier(res.supplier);
      setDateAdded(res.created);
      setSerialNumber(res.serial_number);
      setRemarks(res.remarks);
      // setImages()
    };

    void getAccountRow();
  }, [activeRowId]);

  return (
    <div className="drawer-side z-[9999]">
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <div className="px-[32px] w-[723px] pt-0 h-full bg-secondary text-secondary-content font-khula flex flex-col gap-[8px] overflow-y-scroll">
        <div className="flex justify-start pt-[32px] pb-[16px]  items-center">
          <span className="font-semibold h-[21px] text-[32px] leading-none text-primary">
            Item Details
          </span>
        </div>

        <Carousel isUpdate={isDrawerInEdit} />

        <ul>
          <TextInputField
            label="Property Number"
            value={propertyNumber}
            isUpdate={isDrawerInEdit}
          />
          <TextInputField label="Name" value={name} isUpdate={isDrawerInEdit} />
          <TextInputField
            label="Quantity"
            value={quantity.toString()}
            isUpdate={isDrawerInEdit}
          />
          <SelectField
            label="Type"
            value={type}
            dropdown={[
              { label: 'Furniture', callback: () => setType('Furniture') },
              { label: 'Office', callback: () => setType('Office') },
              { label: 'IT', callback: () => setType('IT') },
            ]}
            isUpdate={isDrawerInEdit}
          />
          <ToggleField
            label="Status"
            value={isAvailable}
            labelValues={{
              checked: 'AVAILABLE',
              unchecked: 'UNAVAILABLE',
            }}
            isUpdate={isDrawerInEdit}
            handleChange={() => {
              //
            }}
          />
          <TextInputField
            label="Location"
            value={location}
            isUpdate={isDrawerInEdit}
          />
          <TextInputField
            label="Supplier"
            value={supplier}
            isUpdate={isDrawerInEdit}
          />
          {!isDrawerInEdit && (
            <>
              <TextInputField label="Date Added" value={dateAdded} />
              <TextInputField label="Serial Number" value={serialNumber} />
            </>
          )}

          <TextAreaField
            label="Remarks"
            elementContent={
              <span className="truncate font-normal h-fit [leading-trim:both] [text-edge:cap] leading-none ">
                {remarks}
              </span>
            }
            isUpdate={isDrawerInEdit}
          />
        </ul>

        <div className="h-full"></div>

        {/* <QrCodeModal /> */}

        {!isDrawerInEdit && (
          <div className="flex flex-col gap-[8px]">
            <div className="flex justify-between items-center">
              <span className=" h-[16px] text-primary/50 text-[24px] -translate-y-[6px]">
                QR Code:
              </span>

              <label
                htmlFor="QrCodeModal"
                className="btn btn-outline px-[16px] hover:btn-primary text-[20px]  font-semibold"
              >
                <span className="h-[13px] ">Print</span>
              </label>
            </div>

            <div className="bg-primary/5 py-[16px] flex justify-center rounded-[5px] ">
              <img src={qrCodeSample} className="w-[300px] h-[300px]" />
            </div>
          </div>
        )}

        <div className="flex justify-end items-center gap-[16px] py-[32px]">
          <button
            onClick={() => setIsDrawerInEdit(!isDrawerInEdit)}
            className="btn btn-primary px-[16px] text-[20px]  font-semibold"
          >
            <span className="h-[13px] ">
              {!isDrawerInEdit ? 'Update' : 'Save Changes'}
            </span>
          </button>
          <label
            htmlFor="my-drawer"
            className="btn btn-outline px-[16px] hover:btn-error text-[20px]  font-semibold"
            onClick={() => setIsDrawerInEdit(false)}
          >
            <span className="h-[13px] ">
              {' '}
              {!isDrawerInEdit ? 'Close' : 'Cancel'}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ItemsSidebar;
