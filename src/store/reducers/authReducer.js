import { USER_LOGIN } from "../constants/authConstants";
import { authState } from "../initialValues/authState";


export default function authReducer(state = authState, { type, payload }) {
    // tüm auth actionları handle et..
    // immutable
    switch (type) {
        case USER_LOGIN:
        // user login işlemleri ele alınmalı..
        case X:

    }
}