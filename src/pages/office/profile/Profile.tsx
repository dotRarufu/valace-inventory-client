import { useState } from 'react';

export type UserData = {
  name: string;
  email: string;
};

export const dummyUserData = {
  name: 'Intern Office',
  email: 'manna@workshop.com',
};

const Profile = () => {
  const [userData, setUserData] = useState<UserData>(dummyUserData);

  return (
    <div className="absolute flex h-[calc(100%-32px)] w-full flex-col gap-4 p-0 px-[16px] font-khula">
      <ul className="flex w-full flex-col gap-2 ">
        <li className="flex flex-col leading-none">
          <div className=" flex max-h-[53px] items-center justify-between py-[4px]">
            <span className=" h-[16px] text-lg text-primary/50">
              Office Name:
            </span>

            <div className="h-[16px] text-lg font-semibold text-primary">
              {userData?.name}
            </div>
          </div>
        </li>
        <li className="flex flex-col leading-none">
          <div className=" flex max-h-[53px] items-center justify-between py-[4px]">
            <span className=" h-[16px] text-lg text-primary/50">Email:</span>

            <div className="h-[16px] text-lg font-semibold text-primary">
              {userData?.email}
            </div>
          </div>
        </li>
        <li className="flex flex-col leading-none">
          <div className=" flex max-h-[53px] items-center justify-between py-[4px]">
            <span className=" h-[16px] text-lg text-primary/50">Password:</span>

            <div className="h-[16px] text-lg font-semibold text-primary ">
              <button className="btn-sm btn rounded-[5px] btn-outline">Change</button>
            </div>
          </div>
        </li>
      </ul>
      <div className="h-full" />
      <button className="btn-outline rounded-[5px] btn text-error hover:btn-error">
        Logout
      </button>
    </div>
  );
};

export default Profile;
