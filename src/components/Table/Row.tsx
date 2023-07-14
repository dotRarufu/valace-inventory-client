import { ReactNode } from 'react';
import ActionDropdown from './ActionDropdown';

type Props = {
  contents: Array<{ isBold?: boolean; body: string | ReactNode }>;
};

const Row = ({ contents }: Props) => {
  return (
    <tr>
      {/* <td className="text-center font-normal">5530E841</td>
      <td className="text-center">Wooden Table</td>
      <td className="text-center">
        <span className="badge text-base badge-primary pt-[2px]">
          Furniture
        </span>
      </td>
      <td className="text-center">1</td>
      <td className="text-center">3F</td>
      <td className="text-center">Ralph Coleco</td>
      <td className="text-center text-error uppercase ">Unavailable</td>

      <td className="text-center">YES</td>
      <td className="text-center">
        <ActionDropdown />
      </td> */}

      {contents.map((t, index) => {
        return (
          <td
            key={index}
            className={`${
              t.isBold ? 'font-semibold' : 'font-normal'
            } text-center `}
          >
            {t.body}
          </td>
        );
      })}
    </tr>
  );
};

export default Row;
