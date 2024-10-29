import React, { createContext, useState, useContext, useEffect } from "react";
import {getAuth, onAuthStateChanged} from "../../auth";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null ); // role is either student or faculty

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);