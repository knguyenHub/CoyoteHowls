import React, { createContext, useState, useContext, useEffect } from "react";


const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState( {isLoggedIn: false, role: null }); // role is either student or faculty

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);