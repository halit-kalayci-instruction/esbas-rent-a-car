import axios from "axios";
import { BASE_API_URL } from "../../enviroment";
import { getItem } from "./localStorage";
import { AUTH_EXCEPTION, BUSINESS_EXCEPTION, VALIDATION_EXCEPTION } from "../enums/exceptionTypes";


const instance = axios.create({
    baseURL: BASE_API_URL
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${getItem("token")}`

    return config;
})

instance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    //switch-case
    switch (error.response.data.Type) {
        case BUSINESS_EXCEPTION:
            // Business Exception'ı handle et
            console.log("BUSINESS_EXCEPTION")
            break;
        case VALIDATION_EXCEPTION:
            // Validation Exception'ı handle et
            console.log("VALIDATION_EXCEPTION")
            break;
        case AUTH_EXCEPTION:
            // Auth Exception'ı handle et..
            console.log("AUTH_EXCEPTION")
            break;
        default:
            // Bilinmedik hata..
            break;
    }
    return Promise.reject(error);
})

export default instance;
