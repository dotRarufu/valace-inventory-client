import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Pagination from '../Pagination';
import { useMemo } from 'react';
import ActionDropdown from './ActionDropdown';
import { AccountDataRow } from '../../pages/Accounts';

const columnHelper = createColumnHelper<AccountDataRow>();

type Props = {
  setData: React.Dispatch<React.SetStateAction<AccountDataRow[]>>;
  data: AccountDataRow[];
};

const AccountsTable = ({ setData, data }: Props) => {
  const columns = useMemo(() => {
    return [
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
      // columnHelper.accessor('email', {
      //   header: () => 'Email',
      //   cell: info => info.renderValue(),
      //   footer: info => info.column.id,
      // }),
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
        cell: info => info.renderValue(),
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
          <ActionDropdown position={info.row.index > 4 ? 'top' : 'bottom'} />
        ),
        footer: info => info.column.id,
      }),
    ];
  }, []);

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

export default AccountsTable;
