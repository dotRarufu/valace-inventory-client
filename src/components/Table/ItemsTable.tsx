import {
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Pagination from '../Pagination';
import { useMemo, useState } from 'react';
import { ItemDataRow } from '../../pages/Items';
import ActionDropdown from '../Items/ActionDropdown';

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

  const [sorting, setSorting] = useState<SortingState>([]);

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
      columnHelper.display({
        id: 'selected',
        header: () => (
          <input
            type="checkbox"
            className="checkbox bg-secondary w-[20px] h-[20px]"
            checked={data.every(d => d.selected)}
            onChange={handleHeaderCheckbox}
          />
        ),
        cell: props => (
          <input
            type="checkbox"
            className="checkbox bg-secondary w-[20px] h-[20px]"
            checked={props.row.original.selected || false}
            onChange={e => handleRowCheckbox(e, props.row.index)}
          />
        ),
        // footer: info => info.column.id,
      }),
      // @ts-ignore
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
            {info.renderValue()}
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
      columnHelper.accessor('is_available', {
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
      columnHelper.display({
        id: 'actions',
        header: () => 'Actions',
        // // pass the item's id? para wala ng context sa parent
        cell: info => (
          <ActionDropdown
            id={data[info.row.index].id}
            position={info.row.index > 4 ? 'top' : 'bottom'}
          />
        ),
        // footer: info => info.column.id,
      }),
    ];
  }, [data, setData]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className=" h-full  flex flex-col justify-between  pb-[40px] relative ">
      <table className=" table table-zebra bg-secondary rounded-[5px]  overflow-x-clip ">
        <thead className="bg-primary text-secondary text-base font-khula ">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="text-center">
                  <div
                    className={`pt-[4px] ${
                      header.column.getCanSort() ? 'cursor-pointer' : ''
                    }`}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted() as string] ?? null}
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
