import { useState } from 'react';
import { useNavigate, useOutlet } from 'react-router-dom';
import { dummyStockItems } from '../../officer/stocks/Stocks';
import { FiSearch } from 'react-icons/fi';

const OfficeUtilize = () => {
  const [items, setItems] = useState(dummyStockItems);
  const navigate = useNavigate();

  const navigateTo = (path: string) => () => navigate(path);

  const outlet = useOutlet();

  return (
    outlet || (
      <div className="absolute flex h-full w-full flex-col gap-2 px-[16px] pb-[8px] font-khula">
        {items.length > 0 ? (
          <div className="flex w-full flex-col gap-4">
            <div className="join w-full">
              <input
                type="text"
                placeholder="Type here"
                className="input-bordered input-primary input join-item w-full "
              />
              <button className=" btn-primary join-item  btn">
                <FiSearch className="h-[20px] w-[20px]  text-primary-content" />
              </button>
            </div>

            <ul className="flex flex-col overflow-clip rounded-[5px]">
              {items.map(item => (
                <li
                  key={item.id}
                  onClick={navigateTo(item.id.toString())}
                  className="flex cursor-pointer items-center justify-between p-2 odd:bg-base-100 even:bg-base-100/40"
                >
                  {item.name}
                  <div className="flex gap-2">
                    <span className="badge badge-success pt-[3px]">
                      {item.tag}
                    </span>

                    <span className="badge badge-info pt-[3px]">
                      {item.remaining}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className=" w-[75%] text-center font-khula text-lg font-semibold">
              There is no stocks
            </span>
          </div>
        )}
      </div>
    )
  );
};

export default OfficeUtilize;
