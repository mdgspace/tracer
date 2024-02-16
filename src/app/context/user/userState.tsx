import { FC, ReactNode, useState } from 'react';
import UserContext from './userContext';
import {  UserOrgs } from 'app/api/user';

interface Props {
  children: ReactNode;
}

const UserState: FC<Props> = ({ children }) => {
  const [username, setUsername] = useState<String | null>(null);
  const [userOrgs, setUserOrgs] = useState<UserOrgs | null>(null);

  return (
    <UserContext.Provider
      value={{ username, setUsername, userOrgs, setUserOrgs }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
