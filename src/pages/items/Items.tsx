import { ReactNode, useEffect, useState } from 'react';
import pb from '../../lib/pocketbase';
import { useDrawer } from '../../hooks/useDrawer';
import { recordActivity } from '../../utils/recordActivity';
import useUser from '../../hooks/useUser';
import { toast } from 'react-hot-toast';
import {
  ActivityActionOptions,
  Collections,
  ItemResponse,
} from '../../../pocketbase-types';
import Button from '../../components/ui/Button';
import XIcon from '../../components/icons/X';
import Trash from '../../components/icons/Trash';
import SearchBar from '../../components/ui/SearchBar';
import ItemsTable from './ItemsTable';
import Add from '../../components/icons/Add';
import ExportDropdown from './ExportDropdown';
import ImportCsv from './ImportCsv';

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
        <ItemsTable
          data={data}
          setData={setData}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>

      <div className="dropdown-top dropdown-end dropdown  absolute bottom-[16px] right-[16px] z-[1]">
        <div className="tooltip-primary tooltip tooltip-left " data-tip="Item">
          <label
            onClick={() => {
              setActiveTable('items');
              setIsDrawerInAdd(true);
            }}
            htmlFor="my-drawer"
            tabIndex={0}
            className="btn-primary btn-circle btn-lg btn px-[16px]"
          >
            <Add />
          </label>
        </div>
        <div
          tabIndex={0}
          className="bg-base-secondary dropdown-content z-[1] w-fit rounded-[5px] "
        ></div>
      </div>
    </div>
  );
};

export default Items;
