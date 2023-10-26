import {
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState, ChangeEvent } from 'react';
import { ItemDataRow } from '.';
import ActionDropdown from './ActionDropdown';
import Pagination, { PaginationProps } from '../../components/ui/Pagination';

const columnHelper = createColumnHelper<ItemDataRow>();

const getColumns = (
  isChecked: boolean,
  handleHeaderCheckbox: (e: ChangeEvent<HTMLInputElement>) => void,
  handleRowCheckbox: (
    e: ChangeEvent<HTMLInputElement>,
    rowIndex: number
  ) => void
) => [
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  columnHelper.display({
    id: 'selected',
    header: () => (
      <input
        type="checkbox"
        className="checkbox h-[20px] w-[20px] bg-secondary"
        checked={isChecked}
        onChange={handleHeaderCheckbox}
      />
    ),
    cell: props => (
      <input
        type="checkbox"
        className="checkbox h-[20px] w-[20px] bg-secondary"
        checked={props.row.original.selected || false}
        onChange={e => handleRowCheckbox(e, props.row.index)}
      />
    ),
  }),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  columnHelper.accessor('id', {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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
      <span className="badge badge-primary pt-[2px] text-base">
        {info.renderValue()}
      </span>
    ),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('quantity', {
    header: () => <span>Quantity</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor('unit', {
    header: 'Unit',
    footer: info => info.column.id,
  }),
  columnHelper.accessor('supplier', {
    header: 'Supplier',
    footer: info => info.column.id,
  }),
  columnHelper.display({
    id: 'is_available',
    header: () => 'Status',
    cell: info => (
      <span
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        className={`${
          info.row.original.quantity > 0 ? 'text-success' : 'text-error'
        }`}
      >
        {info.row.original.quantity > 0 ? 'AVAILABLE' : 'UNAVAILABLE'}
      </span>
    ),
  }),
  columnHelper.accessor('remarks', {
    header: () => 'Remarks',
    cell: info => (info.renderValue() ? 'YES' : 'NO'),
    footer: info => info.column.id,
  }),
  columnHelper.display({
    id: 'actions',
    header: () => 'Actions',
    cell: info => (
      <ActionDropdown
        id={info.row.original.id || 'error-no-id'}
        position={info.row.index > 4 ? 'top' : 'bottom'}
      />
    ),
  }),
];

type Props = {
  setData: React.Dispatch<React.SetStateAction<ItemDataRow[]>>;
  data: ItemDataRow[];
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
  globalFilter: string;
};

const Table = ({ setData, data, setGlobalFilter, globalFilter }: Props) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const handleHeaderCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const newData = [...data].map(d => ({
      ...d,
      selected: e.target.checked,
    }));
    setData(newData);
  };

  const handleRowCheckbox = (
    e: ChangeEvent<HTMLInputElement>,
    rowIndex: number
  ) => {
    const newData = data.map((d, index) =>
      rowIndex === index ? { ...d, selected: e.target.checked } : { ...d }
    );
    setData(newData);
  };

  const table = useReactTable({
    data,
    columns: getColumns(
      data.every(d => d.selected),
      handleHeaderCheckbox,
      handleRowCheckbox
    ),
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
    state: {
      sorting,
      globalFilter,
    },
    autoResetPageIndex: false,
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const paginationProps: PaginationProps = {
    handleStartClick: () => table.setPageIndex(0),
    isStartEnabled: table.getCanPreviousPage(),
    handlePreviousClick: () => table.previousPage(),
    isPreviousEnabled: table.getCanPreviousPage(),
    handleNextClick: () => table.nextPage(),
    isNextEnabled: table.getCanNextPage(),
    handleEndClick: () => table.nextPage(),
    isEndEnabled: table.getCanNextPage(),
    currentPage: table.getState().pagination.pageIndex + 1,
    totalPage: table.getPageCount(),
    handleChangePage: (page: number) => {
      table.setPageIndex(page - 1);
    },
    totalItemCount: data.length,
  };

  return (
    <div className=" relative  flex h-full flex-col  justify-between pb-[40px] ">
      <table className=" table-zebra table overflow-x-clip rounded-[5px]  bg-secondary ">
        <thead className="bg-primary font-khula text-base text-secondary ">
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

        <tbody className=" text font-khula text-[18px] ">
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

      <Pagination {...paginationProps} />
    </div>
  );
};

export default Table;
