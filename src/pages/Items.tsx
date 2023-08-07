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
import { Collections, ItemResponse } from '../../pocketbase-types';
import pb from '../lib/pocketbase';
import { useDrawer } from '../hooks/useDrawer';
import { Parser } from '@json2csv/plainjs';
import ExportDropdown from '../components/Items/ExportDropdown';
import ImportCsv from '../components/Items/ImportCsv';

type Filters = {
  [key: string]: 'Ascending' | 'Descending' | 'Disabled';
};

export interface ItemDataRow extends ItemResponse {
  selected: boolean;
  actions?: ReactNode;
}

const Items = () => {
  const [filters, setFilters] = useState<Filters>({
    ID: 'Disabled',
    Name: 'Disabled',
    Type: 'Disabled',
    Location: 'Disabled',
    Status: 'Disabled',
    Supplier: 'Disabled',
    'Date Added': 'Disabled',
  });
  const {
    setActiveTable,
    shouldUpdateTable,
    setShouldUpdateTable,
    isDrawerInAdd,
    setIsDrawerInAdd,
  } = useDrawer()!;
  const [globalFilter, setGlobalFilter] = useState('');

  useEffect(() => {
    setActiveTable('items');
  }, [setActiveTable]);

  const [data, setData] = useState<ItemDataRow[]>([]);
  // itemRows.map(d => ({ selected: false, ...d }))

  useEffect(() => {
    const getItems = async () => {
      // admins are stored in user collection to store the the plain password
      const itemsRes = await pb
        .collection(Collections.Item)
        .getList<ItemResponse>(1, undefined, {
          filter: 'is_removed = false',
        });
      console.log(
        'update table runs 1:',
        itemsRes.items.map(d => ({ selected: false, ...d }))
      );

      setData(itemsRes.items.map(d => ({ selected: false, ...d })));
    };

    void getItems();
  }, []);

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
      console.log('update table runs 2:', a);

      setData(itemsRes.items.map(d => ({ selected: false, ...d })));
      setShouldUpdateTable(false);
    };

    void getItems();
  }, [setShouldUpdateTable, shouldUpdateTable]);

  const moveFilter = (key: string) => {
    const newFilters = { ...filters };

    switch (newFilters[key]) {
      case 'Ascending':
        newFilters[key] = 'Descending';
        break;
      case 'Descending':
        newFilters[key] = 'Disabled';
        break;
      case 'Disabled':
        newFilters[key] = 'Ascending';
        break;

      default:
        break;
    }

    setFilters(newFilters);
  };

  const clearSelected = () => {
    const newData = data.map(d => ({ ...d, selected: false }));

    setData(newData);
  };

  const getSelectedData = () => {
    return data.filter(d => d.selected);
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
              <Button label="Delete" icon={<Trash />} />
              <Button label="PRINT QR" icon={<QrCode />} />
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
      <Fab
        handleClick={() => {
          setIsDrawerInAdd(true);
        }}
        label={<Add />}
        tooltip="Item"
      />
    </div>
  );
};

export default Items;
