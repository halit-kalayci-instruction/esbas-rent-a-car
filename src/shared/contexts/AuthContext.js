import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const [authInformation, setAuthInformation] = useState({ authenticated: true, user: null })


    return <AuthContext.Provider value={{ authInformation, setAuthInformation }}>
        {props.children}
    </AuthContext.Provider>
}