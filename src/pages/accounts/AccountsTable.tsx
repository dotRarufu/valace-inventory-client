import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';
import ActionDropdown from './ActionDropdown';
import { AccountDataRow } from './Accounts';
import Pagination, { PaginationProps } from '../../components/ui/Pagination';

const columnHelper = createColumnHelper<AccountDataRow>();

type Props = {
  setData: React.Dispatch<React.SetStateAction<AccountDataRow[]>>;
  data: AccountDataRow[];
  // renderActionDropdown: (position: 'top' | 'bottom') => ReactNode;
};

const AccountsTable = ({ data }: Props) => {
  const columns = useMemo(
    () => [
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
      columnHelper.accessor('is_admin', {
        header: () => 'Role',
        cell: info => {
          const roleName = info.renderValue() ? 'admin' : 'staff';
          const backgroundColor =
            roleName === 'staff' ? 'badge-primary' : 'badge-accent';

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
          <span
            className={`${info.renderValue() ? 'text-success' : 'text-error'}`}
          >
            {info.renderValue() ? 'ACTIVE' : 'INACTIVE'}
          </span>
        ),
        footer: info => info.column.id,
      }),
      columnHelper.accessor('actions', {
        header: () => 'Actions',
        // pass the item's id? para wala ng context sa parent
        cell: info => (
          <ActionDropdown
            position={info.row.index > 4 ? 'top' : 'bottom'}
            // improve this, get the id from info param instead
            id={data[info.row.index].id}
          />
        ),
        footer: info => info.column.id,
      }),
    ],
    [data]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
  };

  return (
    <div className=" first-line:  relative flex h-full  flex-col justify-between  pb-[40px]">
      <table
        className=" table-zebra table overflow-x-clip  rounded-[5px]
      bg-secondary 
        "
      >
        <thead className="rounded-[5px] bg-primary font-khula text-base text-secondary  ">
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

export default AccountsTable;
