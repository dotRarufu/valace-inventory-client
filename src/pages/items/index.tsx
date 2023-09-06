import { ReactNode, useEffect, useState } from 'react';
import { useDrawer } from '../../hooks/useDrawer';
import useUser from '../../hooks/useUser';
import { toast } from 'react-hot-toast';
import { ActivityActionOptions, ItemResponse } from '../../../pocketbase-types';
import Button from '../../components/ui/Button';
import XIcon from '../../components/icons/X';
import Trash from '../../components/icons/Trash';
import SearchBar from '../../components/ui/SearchBar';
import Table from './Table';
import Add from '../../components/icons/Add';
import ExportDropdown from './ExportDropdown';
import ImportCsv from './ImportCsv';
import { getAllItems, removeItem } from '../../services/item';
import { toastSettings } from '../../data/toastSettings';
import { recordActivity } from '../../services/logger';
import { PocketbaseError } from '../../types/PocketbaseError';

export interface ItemDataRow extends ItemResponse {
  selected: boolean;
  actions?: ReactNode;
}

const Items = () => {
  const {
    setActiveTable,
    shouldUpdateTable,
    setShouldUpdateTable,
    setState,
    setSelectedRows,
    drawerRef,
  } = useDrawer()!;
  const { user } = useUser()!;
  const [globalFilter, setGlobalFilter] = useState('');
  const [data, setData] = useState<ItemDataRow[]>([]);

  // Get all items
  useEffect(() => {
    getAllItems()
      .then(res => {
        setData(res.items.map(d => ({ selected: false, ...d })));
      })
      .catch(err => {
        const error = err as PocketbaseError;
        const errorFields = Object.keys(error.data.data);
        const field =
          errorFields[0].charAt(0).toUpperCase() + errorFields[0].slice(1);
        const message = `${field} - ${error.data.data[errorFields[0]].message}`;

        toast.error(message, toastSettings);
      });
  }, []);

  // Sync selected rows
  useEffect(() => {
    const selectedRows = data.filter(d => d.selected);

    setSelectedRows(selectedRows);
  }, [data, setSelectedRows]);

  // Update items
  useEffect(() => {
    if (!shouldUpdateTable) return;

    getAllItems()
      .then(res => {
        setData(res.items.map(d => ({ selected: false, ...d })));
        setShouldUpdateTable(false);
      })
      .catch(err => {
        const error = err as PocketbaseError;
        const errorFields = Object.keys(error.data.data);
        const field =
          errorFields[0].charAt(0).toUpperCase() + errorFields[0].slice(1);
        const message = `${field} - ${error.data.data[errorFields[0]].message}`;

        toast.error(message, toastSettings);
      });
  }, [setShouldUpdateTable, shouldUpdateTable]);

  const clearSelected = () => {
    const newData = data.map(d => ({ ...d, selected: false }));

    setData(newData);
  };

  const getSelectedData = () => data.filter(d => d.selected);

  const deleteRows = async () => {
    try {
      const rows = data.filter(d => d.selected).map(r => r.id);
      const reqs = rows.map(async id => {
        await removeItem(id);
        await recordActivity(ActivityActionOptions['DELETE ITEM'], {
          userId: user!.id,
          itemId: id,
        });
      });
      await Promise.all(reqs);

      setShouldUpdateTable(true);
      toast.success(`Items deleted`, toastSettings);
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
    <div className="flex h-full flex-col gap-[16px] px-[36px] pb-[28px]  ">
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
                className="btn-secondary btn px-[16px] text-[20px] font-semibold hover:btn-primary"
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

      <div className="h-[752px] overflow-y-scroll rounded-[5px] bg-secondary">
        <Table
          data={data}
          setData={setData}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>

      <div
        className="tooltip-primary tooltip tooltip-left  absolute bottom-[16px] right-[16px] z-[1]"
        data-tip="Item"
      >
        <label
          onClick={() => {
            setActiveTable('items');
            setState('inAdd');
            drawerRef!.current!.click();
          }}
          // htmlFor="my-drawer"
          tabIndex={0}
          className="btn-primary btn-circle btn-lg btn px-[16px]"
        >
          <Add />
        </label>
      </div>
    </div>
  );
};

export default Items;
