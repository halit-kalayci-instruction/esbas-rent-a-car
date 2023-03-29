import { createContext, useState } from "react";
import { getItem } from "../../core/utils/localStorage";
import jwt_decode from "jwt-decode";
import { ROLES } from "../constants/claimConstants";


export const AuthContext = createContext();

// export const useAuth = () => {
//     return useContext(AuthContext);
// }
// React Component
//!: React Hooks & Export Function
export const AuthProvider = (props) => {

    const getInitialUser = () => {
        let token = getItem("token");
        // let remember = getItem("rememberMe")
        // if(!remember)  return { authenticated: false, user: null, roles: [] };
        if (token) {
            let userInfo = jwt_decode(token);
            let expired = Date.now() >= userInfo.exp * 1000;
            if (!expired) {
                return { authenticated: true, user: userInfo, roles: userInfo[ROLES] }
            }
        }
        return { authenticated: false, user: null, roles: [] }
    }

    const [authInformation, setAuthInformation] = useState(getInitialUser())

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