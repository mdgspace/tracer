import { UserOrgs } from "app/api/user";
import { createContext } from "react";

export interface UserContextType{
    username: String | null;
    setUsername: (name: String)=>void;
    userOrgs: UserOrgs | null;
    setUserOrgs: (user_Orgs: UserOrgs)=> void
}

const UserContext= createContext<UserContextType | undefined>(undefined);

export default UserContext;