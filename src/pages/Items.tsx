import importCsv from '../assets/import-csv.svg';
import sort from '../assets/sort.svg';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';
import Fab from '../components/Fab';
import ActionDropdown from '../components/Table/ActionDropdown';
import Header from '../components/Table/Header';
import Row from '../components/Table/Row';
import Table from '../components/Table/Table';
import csvIcon from '../assets/csv.svg';
import pdfIcon from '../assets/pdf.svg';
import { useState } from 'react';
import ArrowUp from '../components/Icons/ArrowUp';
import ArrowDown from '../components/Icons/ArrowDown';
import SearchBar from '../components/SearchBar';
import NewDropdown from '../components/Table/NewDropdown';
import Add from '../components/Icons/Add';

type Filters = {
  [key: string]: 'Ascending' | 'Descending' | 'Disabled';
};

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

  const getHeaderContents = () => {
    return [
      <input type="checkbox" className="checkbox bg-secondary " />,
      'ID',
      'Name',
      'Type',
      'Quantity',
      'Location',
      'Supplier',
      'Status',
      'Remarks',
      'Actions',
    ];
  };

  const getRows = () => {
    const sampleRow = [
      {
        body: <input type="checkbox" className="checkbox bg-secondary " />,
      },
      {
        body: '5530E841',
      },
      {
        body: 'Wooden Table',
      },
      {
        body: (
          <span className="badge text-base badge-primary pt-[2px]">
            Furniture
          </span>
        ),
      },
      {
        body: '1',
      },
      {
        body: '3F',
      },
      {
        body: 'Ralph Coleco',
      },
      {
        body: <span className="text-error">UNAVAILABLE</span>,
      },
      {
        body: 'YES',
      },
      {
        body: <NewDropdown />,
      },
    ];

    return [1, 2].map(() => <Row contents={sampleRow} />);
  };

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

  return (
    <div className="flex flex-col gap-[16px] pb-[28px] px-[36px] h-full  ">
      <div className="flex justify-between grow-0 shrink-0">
        <div className="flex gap-[16px]">
          <Dropdown
            label={<Button label="Export" icon={importCsv} />}
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
          <Button label="Import CSV" icon={importCsv} />
        </div>

        <div className="flex gap-[16px]">
          <SearchBar />

          <div className="dropdown dropdown-end">
            <label tabIndex={0}>
              <Button label="Sort" icon={sort} />
            </label>
            <div
              tabIndex={0}
              className="dropdown-content z-[1] rounded-[5px]  w-fit "
            >
              <ul className="menu w-56 bg-secondary rounded-[5px] shadow text-[24px] font-khula px-0 gap-[8px] ">
                {Object.keys(filters).map(key => (
                  <li
                    onClick={() => moveFilter(key)}
                    // className="border border-red-500 "
                  >
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
        <Table
          header={<Header contents={getHeaderContents()} />}
          rows={getRows()}
        />
      </div>
      <Fab label={<Add />} tooltip="Item" />
    </div>
  );
};

export default Items;
