import { USER_LOGIN } from "../constants/authConstants";
import { authState } from "../initialValues/authState";


export default function authReducer(state = authState, { type, payload }) {
    // tüm auth actionları handle et..
    // immutable
    switch (type) {
        case USER_LOGIN:
            // user login işlemleri ele alınmalı..
            // {authenticated:false,user:null}
            // user: {name:"halit",email:"halit@kodlama.io"}
            // state.user = {name:"halit",email:"halit@kodlama.io"}
            // {authenticated:true, user :{name:"halit",email:"halit@kodlama.io"}}

            let firstValue = { authenticated: false, user: null };
            // YENİ STATEI RETURN ET!
            return { authenticated: true, user: payload }
        default:
            return state;
    }
}
