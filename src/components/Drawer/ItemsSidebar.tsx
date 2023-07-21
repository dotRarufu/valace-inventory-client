import TextAreaField from '../Field/TextAreaField';
import TextInputField from '../Field/TextInputField';
import SelectField from '../Field/SelectField';
import ToggleField from '../Field/ToggleField';
import Carousel from './Carousel';
import qrCodeSample from '../../assets/qr.png';

type Props = {
  isDrawerInEdit: boolean;
  setIsDrawerInEdit: React.Dispatch<React.SetStateAction<boolean>>;
  activeRowId: string;
  setShouldUpdateTable: React.Dispatch<React.SetStateAction<boolean>>;
};

const ItemsSidebar = ({
  isDrawerInEdit,
  setIsDrawerInEdit,
  activeRowId,
  setShouldUpdateTable,
}: Props) => {
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

        {/* <ul>
          <TextInputField
            label="Property Number"
            value="ABC"
            isUpdate={isDrawerInEdit}
          />
          <TextInputField
            label="Name"
            value="Table"
            isUpdate={isDrawerInEdit}
          />
          <TextInputField
            label="Quantity"
            value="24"
            isUpdate={isDrawerInEdit}
          />
          <SelectField
            label="Type"
           
            dropdown={[{ label: 'Furniture' }, { label: 'Office' }]}
            isUpdate={isDrawerInEdit}
          />
          <ToggleField
            label="Status"
            values={{
              checkedLabel: 'AVAILABLE',
              uncheckedLabel: 'UNAVAILABLE',
            }}
            isUpdate={isDrawerInEdit}
            stringContent={true}
          />
          <TextInputField
            label="Location"
            stringContent="3F"
            isUpdate={isDrawerInEdit}
          />
          <TextInputField
            label="Supplier"
            stringContent="ValACE"
            isUpdate={isDrawerInEdit}
          />
          {!isDrawerInEdit && (
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
            isUpdate={isDrawerInEdit}
          />
        </ul> */}

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
