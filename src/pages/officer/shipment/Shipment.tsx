import { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { ItemTypeOptions } from '../../../../pocketbase-types';
import { useNavigate, useOutlet } from 'react-router-dom';

type Item = {
  name: string;
  tag: ItemTypeOptions;
  id: number;
};

const dummyItems: Item[] = [
  { name: 'Wooden Chair', tag: ItemTypeOptions.Office, id: 0 },
  { name: 'Goofy Mouse', tag: ItemTypeOptions.IT, id: 1 },
  { name: 'AMD A6 Laptop', tag: ItemTypeOptions.IT, id: 2 },
];

const Shipment = () => {
  const navigate = useNavigate();
  const [activeShipment, setActiveShipment] = useState('September 2023');
  const [items, setItems] = useState(dummyItems);

  const navigateTo = (path: string) => () => navigate(path);
  const outlet = useOutlet();

  return (
    <div>
      {outlet || (
        <div className="flex flex-col gap-2 font-khula">
          <div className="text-lg font-bold">{activeShipment} Shipment</div>

          <ul className="flex flex-col rounded-[5px] ">
            {items.map(item => (
              <li className="even:bg-base-100/40 flex items-center justify-between p-2   odd:bg-base-100">
                {item.name}
                <span className="badge badge-success">{item.tag}</span>

                <button
                  onClick={navigateTo(item.id.toString())}
                  className="btn-square btn-sm btn"
                >
                  <FiArrowRight />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Shipment;
