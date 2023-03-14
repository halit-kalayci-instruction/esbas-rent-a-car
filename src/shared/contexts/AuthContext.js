import { createContext, useState } from "react";

export const AuthContext = createContext();

// export const useAuth = () => {
//     return useContext(AuthContext);
// }

//TODO: Local storageda süresi geçmemiş bir token var ise bunu incele ve kullanıcıyı buna göre al.

// React Component
//!: React Hooks & Export Function
export const AuthProvider = (props) => {
    const [authInformation, setAuthInformation] = useState({ authenticated: false, user: null, roles: [] })

    const hasPermission = (roles) => {
        if (authInformation.authenticated == false) return false;
        if (roles.length <= 0) return true;
        let userRoles = authInformation.roles;
        let result = userRoles.some(i => roles.includes(i));
        return result;
    }

    return <AuthContext.Provider value={{ authInformation, setAuthInformation, hasPermission }}>
        {props.children}
    </AuthContext.Provider>
}