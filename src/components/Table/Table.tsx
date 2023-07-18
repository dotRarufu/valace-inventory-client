import { ReactNode } from 'react';
import Pagination from '../Pagination';

type Props = {
  header: ReactNode;
  rows: ReactNode[];
};

const Table = ({ header, rows }: Props) => {
  return (
    <div className=" h-full  flex flex-col justify-between  pb-[40px] relative ">
      <table className=" table table-zebra bg-secondary rounded-[5px]  overflow-y-clip ">
        {header}
        <tbody className=" font-khula text-[18px] text ">{rows}</tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default Table;
