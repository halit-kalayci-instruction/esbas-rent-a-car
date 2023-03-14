//React Hooks

import store from "../../../store/configureStore";
import { ROLES } from "../../constants/claimConstants";


export const userHasRole = (roles) => {
    let state = store.getState();
    if (state.auth.authenticated == false) return false;
    if (roles.length <= 0) return true;
    let userRoles = state.auth.user[ROLES];
    let result = userRoles.some(i => roles.includes(i));
    return result;
};