import { createContext } from 'react';
import { UserResponse } from '../../pocketbase-types';

export type UserState = {
  user: UserResponse | null;

  setShouldGetUser: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserContext = createContext<UserState | null>(null);
