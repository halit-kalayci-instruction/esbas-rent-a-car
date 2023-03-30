import axios from "axios";
import { BASE_API_URL } from "../../enviroment";
import { getItem, setItem } from "./localStorage";
import { AUTH_EXCEPTION, BUSINESS_EXCEPTION, INTERNAL_EXCEPTION, VALIDATION_EXCEPTION } from "../enums/exceptionTypes";
import { handleAuthException, handleBusinessException, handleDefaultException, handleValidationException, handleUnknownException } from "./exceptionHandlers";

const instance = axios.create({
    baseURL: BASE_API_URL,
    withCredentials: true
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${getItem("token")}`
    return config;
})

instance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    switch (error.response.data.Type) {
        case BUSINESS_EXCEPTION:
            handleBusinessException(error.response.data)
            break;
        case VALIDATION_EXCEPTION:
            handleValidationException(error.response.data);
            break;
        case AUTH_EXCEPTION:
            // Requestin kopyasının tutularak retry yapılması
            const originialRequest = error.config;
            //return axios(originialRequest);
            instance.get('Auth/RefreshToken').then(response => {
                let token = response.data.token;
                setItem('token', token);
                originialRequest.headers.Authorization = `Bearer ${token}`;
                return axios(originialRequest);
            });
            handleAuthException();
            break;
        case INTERNAL_EXCEPTION:
            handleDefaultException(error.response.data);
        // case "ERROR_TYPE_3":
        //     toastr.error(error.response.data.Detail)
        default:
            handleUnknownException(error);
            break;
    }
    return Promise.reject(error);
})

export default instance;
