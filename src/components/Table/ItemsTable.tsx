import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Pagination from '../Pagination';
import { useMemo } from 'react';
import { typeIdToText } from '../../utils/typeIdToText';
import ActionDropdown from './ActionDropdown';
import { ItemDataRow } from '../../pages/Items';

const columnHelper = createColumnHelper<ItemDataRow>();

type Props = {
  setData: React.Dispatch<React.SetStateAction<ItemDataRow[]>>;
  data: ItemDataRow[];
};

const ItemsTable = ({ setData, data }: Props) => {
  // const [data, setData] = useState<ItemDataRow[]>(
  //   itemRows.map(d => ({ selected: false, ...d }))
  // );

  // useEffect(() => {
  //   const ids = data.filter(d => d.selected).map(d => d.id);
  //   setSelectedRowsId(ids);
  // }, [data, setSelectedRowsId]);

  console.log('re renders');

  const columns = useMemo(() => {
    const handleHeaderCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newData = [...data].map(d => ({
        ...d,
        selected: e.target.checked,
      }));
      setData(newData);
    };

    const handleRowCheckbox = (
      e: React.ChangeEvent<HTMLInputElement>,
      rowIndex: number
    ) => {
      const newData = data.map((d, index) =>
        rowIndex === index ? { ...d, selected: e.target.checked } : { ...d }
      );
      setData(newData);
    };

    return [
      // @ts-ignore
      columnHelper.accessor('selected', {
        header: () => (
          <input
            type="checkbox"
            className="checkbox bg-secondary w-[20px] h-[20px]"
            checked={data.every(d => d.selected)}
            onChange={handleHeaderCheckbox}
          />
        ),
        cell: info => (
          <input
            type="checkbox"
            className="checkbox bg-secondary w-[20px] h-[20px]"
            checked={info.renderValue() || false}
            onChange={e => handleRowCheckbox(e, info.row.index)}
          />
        ),
        footer: info => info.column.id,
      }),
      columnHelper.accessor('id', {
        header: () => 'ID',
        cell: info => info.getValue(),
        footer: info => info.column.id,
      }),
      columnHelper.accessor(row => row.name, {
        id: 'name',
        cell: info => info.getValue(),
        header: () => <span>Name</span>,
        footer: info => info.column.id,
      }),
      columnHelper.accessor('type', {
        header: () => 'Type',
        cell: info => (
          <span className="badge text-base badge-primary pt-[2px]">
            {typeIdToText(info.renderValue() ?? -1)}
          </span>
        ),
        footer: info => info.column.id,
      }),
      columnHelper.accessor('quantity', {
        header: () => <span>Quantity</span>,
        footer: info => info.column.id,
      }),
      columnHelper.accessor('location', {
        header: 'Location',
        footer: info => info.column.id,
      }),
      columnHelper.accessor('supplier', {
        header: 'Supplier',
        footer: info => info.column.id,
      }),
      columnHelper.accessor('status', {
        header: () => 'Status',
        cell: info => (
          <span
            className={`${info.renderValue() ? 'text-success' : 'text-error'}`}
          >
            {info.renderValue() ? 'AVAILABLE' : 'UNAVAILABLE'}
          </span>
        ),
        footer: info => info.column.id,
      }),
      columnHelper.accessor('remarks', {
        header: () => 'Remarks',
        cell: info => (info.renderValue() ? 'YES' : 'NO'),
        footer: info => info.column.id,
      }),
      columnHelper.accessor('actions', {
        header: () => 'Actions',
        // pass the item's id? para wala ng context sa parent
        cell: info => (
          <ActionDropdown position={info.row.index > 4 ? 'top' : 'bottom'} />
        ),
        footer: info => info.column.id,
      }),
    ];
  }, [data]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className=" h-full  flex flex-col justify-between  pb-[40px] relative ">
      <table className=" table table-zebra bg-secondary rounded-[5px]  overflow-y-clip ">
        <thead className="bg-primary text-secondary text-base font-khula ">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="text-center">
                  <div className="pt-[4px]">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className=" font-khula text-[18px] text ">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="text-center">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default ItemsTable;
