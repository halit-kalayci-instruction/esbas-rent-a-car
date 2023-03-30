//DEPO'YA gelecek Auth verisinin ilk hali..
// localStorage'da JWT var ise decode et bunu kullan
import { getItem } from "../../core/utils/localStorage";
import jwt_decode from "jwt-decode";
import { ROLES } from "../../shared/constants/claimConstants";


const getInitialUser = () => {
    let token = getItem("token");
    // let remember = getItem("rememberMe")
    // if(!remember)  return { authenticated: false, user: null, roles: [] };
    if (token) {
        let userInfo = jwt_decode(token);
        return { authenticated: true, user: userInfo, roles: userInfo[ROLES] }
    }
    return { authenticated: false, user: null, roles: [] }
}

export const authState = getInitialUser();
