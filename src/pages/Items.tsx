import importCsv from '../assets/import-csv.svg';
import sort from '../assets/sort.svg';
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
import ImportCsv from '../components/Icons/ImportCsv';
import ArrowDown from '../components/Icons/ArrowDown';
import Add from '../components/Icons/Add';
import XIcon from '../components/Icons/X';
import Trash from '../components/Icons/Trash';
import QrCode from '../components/Icons/QrCode';
import { ItemData } from '../types/ItemData';
import { itemRows } from '../sampleData';

type Filters = {
  [key: string]: 'Ascending' | 'Descending' | 'Disabled';
};

export interface ItemDataRow extends ItemData {
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

  const [data, setData] = useState<ItemDataRow[]>(
    itemRows.map(d => ({ selected: false, ...d }))
  );

  useEffect(() => {
    // console.log('selected rows:', data);
  }, [data]);

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
              <Dropdown
                label={<Button label="Export" icon={<TableExport />} />}
                content={{
                  type: 'List',
                  body: [
                    {
                      label: 'CSV',
                      icon: csvIcon,
                    },
                    {
                      label: 'PDF',
                      icon: pdfIcon,
                    },
                  ],
                }}
              />
              <Button label="Import CSV" icon={<ImportCsv />} />
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
          <SearchBar />

          <div className="dropdown dropdown-end">
            <label tabIndex={0}>
              <Button label="Sort" icon={<Sort />} />
            </label>
            <div
              tabIndex={0}
              className="dropdown-content z-[1] rounded-[5px]  w-fit "
            >
              <ul className="menu w-56 bg-secondary rounded-[5px] shadow text-[24px] font-khula px-0 gap-[8px] ">
                {Object.keys(filters).map(key => (
                  <li key={key} onClick={() => moveFilter(key)}>
                    <a className="justify-between rounded-none px-[24px]  py-[4px]">
                      <span className="h-[16px] ">{key}</span>

                      {filters[key] !== 'Disabled' ? (
                        filters[key] === 'Ascending' ? (
                          <ArrowUp />
                        ) : (
                          <ArrowDown />
                        )
                      ) : (
                        <img src={''} className="h-[28px]" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-secondary rounded-[5px] h-[752px] overflow-y-scroll">
        <ItemsTable data={data} setData={setData} />
      </div>
      <Fab label={<Add />} tooltip="Item" />
    </div>
  );
};

export default Items;
