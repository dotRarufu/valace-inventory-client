import importCsv from '../assets/import-csv.svg';
import sort from '../assets/sort.svg';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';
import Fab from '../components/Fab';
import Row from '../components/Table/Row';
import Table from '../components/Table/Table';
import csvIcon from '../assets/csv.svg';
import pdfIcon from '../assets/pdf.svg';
import { useEffect, useState } from 'react';
import ArrowUp from '../components/Icons/ArrowUp';
import ArrowDown from '../components/Icons/ArrowDown';
import SearchBar from '../components/SearchBar';
import NewDropdown from '../components/Table/NewDropdown';
import Add from '../components/Icons/Add';
import Header from '../components/Table/Header';
import ImportCsv from '../components/Icons/ImportCsv';
import TableExport from '../components/Icons/TableExport';
import Sort from '../components/Icons/Sort';
import { itemRows as sampleItemRows } from '../sampleData';
import { typeIdToText } from '../utils/typeIdToText';

type Filters = {
  [key: string]: 'Ascending' | 'Descending' | 'Disabled';
};

const Items = () => {
  const [rows, setRows] = useState<
    { selected: boolean; rowElement: JSX.Element }[]
  >([]);
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

  useEffect(() => {
    const getRows = () => {
      const newRows = sampleItemRows.map((data, index) => {
        const contents = [
          {
            body: (
              <input
                type="checkbox"
                className="checkbox bg-secondary"
                checked={rows[index]?.selected || false}
                onClick={() => {
                  setRows(r =>
                    r.map((d, i) =>
                      i === index
                        ? { selected: true, rowElement: d.rowElement }
                        : d
                    )
                  );
                  console.log('clicked:', rows[index].selected);
                }}
              />
            ),
          },
          {
            body: data.id,
          },
          {
            body: data.name,
          },
          {
            body: (
              <span className="badge text-base badge-primary pt-[2px]">
                {typeIdToText(data.typeId)}
              </span>
            ),
          },
          {
            body: data.quantity.toString(),
          },
          {
            body: data.location,
          },
          {
            body: data.supplier,
          },
          {
            body: (
              <span className="text-error">
                {data.status ? 'AVAILABLE' : 'UNAVAILABLE'}
              </span>
            ),
          },
          {
            body: data.remarks ? 'YES' : 'NO',
          },
          {
            body: <NewDropdown />,
          },
        ];

        return {
          selected: rows[index]?.selected || false,
          rowElement: <Row key={data.id} contents={contents} />,
        };
      });

      return newRows;
    };
    const newRows = getRows();
    setRows(newRows);
  }, [rows]);

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

  console.log("renders")

  return (
    <div className="flex flex-col gap-[16px] pb-[28px] px-[36px] h-full  ">
      <div className="flex justify-between ">
        <div className="flex gap-[16px]">
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
        <Table
          header={<Header contents={getHeaderContents()} />}
          rows={rows.map(r => r.rowElement)}
        />
      </div>
      <Fab label={<Add />} tooltip="Item" />
    </div>
  );
};

export default Items;
