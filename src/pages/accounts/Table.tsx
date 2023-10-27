import {
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import ActionDropdown from './ActionDropdown';
import { AccountDataRow } from '.';
import Pagination, { PaginationProps } from '../../components/ui/Pagination';
import { useState } from 'react';
import { UserTypeOptions } from '../../../pocketbase-types';

const columnHelper = createColumnHelper<AccountDataRow>();

const getRoleColor = (role: UserTypeOptions) => {
  switch (role) {
    case UserTypeOptions.STAFF:
      return 'badge-primary';
    case UserTypeOptions.ADMIN:
      return 'badge-accent';
    case UserTypeOptions.OFFICE:
      return 'badge-info';
    case UserTypeOptions.OFFICER:
      return 'badge-success';

    default:
      throw 'unknown role';
  }
};

type Props = {
  setData: React.Dispatch<React.SetStateAction<AccountDataRow[]>>;
  data: AccountDataRow[];
};

const columns = [
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  columnHelper.accessor('id', {
    header: () => 'UID',
    cell: info => info.renderValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('username', {
    header: () => 'Username',
    cell: info => info.renderValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('type', {
    header: () => 'Role',
    cell: info => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const roleName = info.renderValue();
      const backgroundColor = getRoleColor(roleName);

      return (
        <span
          className={`badge text-base ${backgroundColor} pt-[2px] capitalize`}
        >
          <span className="h-[14px] leading-none">{roleName}</span>
        </span>
      );
    },
    footer: info => info.column.id,
  }),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  columnHelper.accessor('created', {
    header: () => 'Date Created',
    cell: info => new Date(info.renderValue() || '').toLocaleString(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('plain_password', {
    header: () => 'Password',
    cell: info => info.renderValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('is_active', {
    header: () => 'Status',
    cell: info => (
      <span className={`${info.renderValue() ? 'text-success' : 'text-error'}`}>
        {info.renderValue() ? 'ACTIVE' : 'INACTIVE'}
      </span>
    ),
    footer: info => info.column.id,
  }),
  columnHelper.display({
    id: 'actions',
    header: () => 'Actions',
    cell: info => (
      <ActionDropdown
        position={info.row.index > 4 ? 'top' : 'bottom'}
        id={info.row.original.id || 'error-no-id'}
      />
    ),
    footer: info => info.column.id,
  }),
];

const Table = ({ data }: Props) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
    state: {
      sorting,
    },
    autoResetPageIndex: false,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
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
    <div className="relative flex h-full flex-col justify-between pb-[40px]">
      <table
        className="table-zebra table overflow-x-clip rounded-[5px]
      bg-secondary"
      >
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

        <tbody className="text font-khula text-[18px] ">
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
