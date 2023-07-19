import { ReactNode } from 'react';
import ActionDropdown from './ActionDropdown';

type Props = {
  contents: Array<{ isBold?: boolean; body: string | ReactNode }>;
};

const Row = ({ contents }: Props) => {
  return (
    <tr>
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
