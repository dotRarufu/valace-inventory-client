import { ReactNode } from 'react';

type Props = {
  contents: Array<string | ReactNode>;
};

const Header = ({ contents }: Props) => {
  return (
    <thead className="bg-primary text-secondary text-base font-khula ">
      <tr>
        {contents.map((t, index) => {
          return (
            <th key={index} className="text-center">
              <div className="pt-[4px]">{t}</div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default Header;
