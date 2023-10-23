import { useEffect, useState } from 'react';
import pb from '../../../lib/pocketbase';
import useUser from '../../../hooks/useUser';

export type user = {
  name: string;
  email: string;
};

const Profile = () => {
  const { user } = useUser();

  const logout = () => {
    pb.authStore.clear();

    // await recordActivity(ActivityActionOptions.LOGOUT, {
    //   userId: user!.id,
    // });
  };

  return (
    <div className="absolute flex h-[calc(100%-32px)] w-full flex-col gap-4 p-0 px-[16px] font-khula">
      <ul className="flex w-full flex-col gap-2 ">
        <li className="flex flex-col leading-none">
          <div className=" flex max-h-[53px] items-center justify-between py-[4px]">
            <span className=" h-[16px] text-lg text-primary/50">
              Office Name:
            </span>

            <div className="h-[16px] text-lg font-semibold text-primary">
              {user?.username}
            </div>
          </div>
        </li>
        <li className="flex flex-col leading-none">
          <div className=" flex max-h-[53px] items-center justify-between py-[4px]">
            <span className=" h-[16px] text-lg text-primary/50">Created:</span>

            <div className="h-[16px] text-lg font-semibold text-primary">
              {user?.created}
            </div>
          </div>
        </li>
        <li className="flex flex-col leading-none">
          <div className=" flex max-h-[53px] items-center justify-between py-[4px]">
            <span className=" h-[16px] text-lg text-primary/50">Password:</span>

            <div className="h-[16px] text-lg font-semibold text-primary ">
              <button className="btn-outline btn-sm btn rounded-[5px]">
                Change
              </button>
            </div>
          </div>
        </li>
      </ul>
      <div className="h-full" />
      <button
        onClick={logout}
        className="btn-outline btn rounded-[5px] text-error hover:btn-error"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
