import { createContext, useState } from "react";

export const AuthContext = createContext();

//TODO: Local storageda süresi geçmemiş bir token var ise bunu incele ve kullanıcıyı buna göre al.
export const AuthProvider = (props) => {
    const [authInformation, setAuthInformation] = useState({ authenticated: false, user: null, roles: [] })

    return <AuthContext.Provider value={{ authInformation, setAuthInformation }}>
        {props.children}
    </AuthContext.Provider>
}