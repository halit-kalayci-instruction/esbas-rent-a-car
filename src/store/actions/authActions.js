import { USER_LOGIN } from "../constants/authConstants";

export function Login(user) {
    return {
        type: USER_LOGIN,
        payload: user
    }
}



// type => USER_LOGIN , payload => data
