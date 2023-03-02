import { USER_LOGIN, USER_LOGOUT } from "../constants/authConstants";

export function Login(user) {
    return {
        type: USER_LOGIN,
        payload: user
    }
}

export function Logout() {
    return {
        type: USER_LOGOUT,
        payload: {}
    }
}



// type => USER_LOGIN , payload => data
