import Button from '../components/Button';
import Dropdown from '../components/Dropdown';
import Fab from '../components/Fab';
import csvIcon from '../assets/csv.svg';
import pdfIcon from '../assets/pdf.svg';
import { ReactNode, useEffect, useState } from 'react';
import ArrowUp from '../components/Icons/ArrowUp';
import SearchBar from '../components/SearchBar';
import TableExport from '../components/Icons/TableExport';
import Sort from '../components/Icons/Sort';
import ItemsTable from '../components/Table/ItemsTable';
import ArrowDown from '../components/Icons/ArrowDown';
import Add from '../components/Icons/Add';
import XIcon from '../components/Icons/X';
import Trash from '../components/Icons/Trash';
import QrCode from '../components/Icons/QrCode';
import {
  ActivityActionOptions,
  Collections,
  ItemResponse,
} from '../../pocketbase-types';
import pb from '../lib/pocketbase';
import { useDrawer } from '../hooks/useDrawer';
import { Parser } from '@json2csv/plainjs';
import ExportDropdown from '../components/Items/ExportDropdown';
import ImportCsv from '../components/Items/ImportCsv';
import { recordActivity } from '../utils/recordActivity';
import useUser from '../hooks/useUser';
import { toast } from 'react-hot-toast';
import { generateCoutout } from '../utils/generateCutout';

type Filters = {
  [key: string]: 'Ascending' | 'Descending' | 'Disabled';
};

export interface ItemDataRow extends ItemResponse {
  selected: boolean;
  actions?: ReactNode;
}

const Items = () => {
  const {
    setActiveTable,
    shouldUpdateTable,
    setShouldUpdateTable,
    setIsDrawerInAdd,
    setSelectedRows,
  } = useDrawer()!;
  const { user } = useUser()!;
  const [globalFilter, setGlobalFilter] = useState('');

  const [data, setData] = useState<ItemDataRow[]>([]);

  useEffect(() => {
    const getItems = async () => {
      // admins are stored in user collection to store the the plain password
      const itemsRes = await pb
        .collection(Collections.Item)
        .getList<ItemResponse>(1, undefined, {
          filter: 'is_removed = false',
        });

      setData(itemsRes.items.map(d => ({ selected: false, ...d })));
    };

    void getItems();
  }, []);

  useEffect(() => {
    const selectedRows = data.filter(d => d.selected);

    setSelectedRows(selectedRows);
  }, [data, setSelectedRows]);

  // separated for readability
  useEffect(() => {
    if (!shouldUpdateTable) return;

    const getItems = async () => {
      // admins are stored in user collection to store the the plain password
      const itemsRes = await pb
        .collection(Collections.Item)
        .getList<ItemResponse>(1, undefined, {
          filter: 'is_removed = false',
        });

      const a = await pb.collection(Collections.Item).getFullList();

      setData(itemsRes.items.map(d => ({ selected: false, ...d })));
      setShouldUpdateTable(false);
    };

    void getItems();
  }, [setShouldUpdateTable, shouldUpdateTable]);

  const clearSelected = () => {
    const newData = data.map(d => ({ ...d, selected: false }));

    setData(newData);
  };

  const getSelectedData = () => {
    return data.filter(d => d.selected);
  };

  const deleteRows = async () => {
    // todo: refactor others to be like this
    // to reduce use of uef
    try {
      const rows = data.filter(d => d.selected).map(r => r.id);

      const reqs = rows.map(async id => {
        await pb.collection(Collections.Item).update(id, {
          is_removed: true,
        });
        await recordActivity(ActivityActionOptions['DELETE ITEM'], {
          userId: user!.id,
          itemId: id,
        });
      });

      await Promise.all(reqs);

      setShouldUpdateTable(true);
      toast.success(`Items deleted`, {
        duration: 7000,
        position: 'bottom-center',
        className: 'font-semibold',
      });
    } catch (err) {
      toast.error(`Item not deleted`, {
        duration: 7000,
        position: 'bottom-center',
        className: 'font-semibold',
      });
    }
  };

  return (
    <div className="flex flex-col gap-[16px] pb-[28px] px-[36px] h-full  ">
      <div className="flex justify-between ">
        <div className="flex gap-[16px]">
          {getSelectedData().length === 0 ? (
            <>
              <ExportDropdown data={data} />
              <ImportCsv />
            </>
          ) : (
            <>
              <Button
                label={`${getSelectedData().length} SELECTED`}
                icon={<XIcon />}
                handleClick={clearSelected}
              />
              <Button
                label="Delete"
                icon={<Trash />}
                handleClick={() => void deleteRows()}
              />

              <label
                onClick={() => {
                  setActiveTable('print-qr');
                }}
                htmlFor="my-drawer"
                className="btn btn-secondary hover:btn-primary px-[16px] text-[20px] font-semibold"
              >
                <Trash />
                Print qr
              </label>
            </>
          )}
        </div>

        <div className="flex gap-[16px]">
          <SearchBar
            handleOnChange={setGlobalFilter}
            globalFilter={globalFilter}
          />
        </div>
      </div>

      <div className="bg-secondary rounded-[5px] h-[752px] overflow-y-scroll">
        <ItemsTable
          data={data}
          setData={setData}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>

      <div className="dropdown dropdown-top dropdown-end  absolute bottom-[16px] right-[16px] z-[1]">
        <div className="tooltip tooltip-left tooltip-primary " data-tip="Item">
          <label
            onClick={() => {
              setActiveTable('items');
              setIsDrawerInAdd(true);
            }}
            htmlFor="my-drawer"
            tabIndex={0}
            className="btn btn-circle btn-lg btn-primary px-[16px]"
          >
            <Add />
          </label>
        </div>
        <div
          tabIndex={0}
          className="dropdown-content z-[1] rounded-[5px] bg-base-secondary w-fit "
        ></div>
      </div>
    </div>
  );
};

export default Items;
