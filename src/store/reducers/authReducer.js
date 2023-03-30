import { getItem } from "../../core/utils/localStorage";
import { REFRESH_USER, USER_LOGIN, USER_LOGOUT } from "../constants/authConstants";
import { authState } from "../initialValues/authState";
import jwt_decode from "jwt-decode";


export default function authReducer(state = authState, { type, payload }) {
    // tüm auth actionları handle et..
    // immutable
    switch (type) {
        case USER_LOGIN:
            // user login işlemleri ele alınmalı..
            // {authenticated:false,user:null}
            // user: {name:"halit",email:"halit@kodlama.io"}
            // state.user = {name:"halit",email:"halit@kodlama.io"}
            // {authenticated:true, user : {name:"halit",email:"halit@kodlama.io"} }
            // YENİ STATEI RETURN ET!
            return { authenticated: true, user: payload }
        case USER_LOGOUT:
            return authState;
        case REFRESH_USER:
            let token = getItem("token");
            // let remember = getItem("rememberMe")
            // if(!remember)  return { authenticated: false, user: null, roles: [] };
            if (token) {
                let userInfo = jwt_decode(token);
                return { authenticated: true, user: userInfo, roles: userInfo[ROLES] }
            }
            return { authenticated: false, user: null, roles: [] }
        default:
            return state;
    }
}
