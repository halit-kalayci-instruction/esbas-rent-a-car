import { BASE_API_URL } from "../../../../enviroment";
import instance from "../../../../core/utils/axiosInterceptors";
import axios from "axios";

export default class LoginService {
    // axios
    login(credentials) {
        return axios
            .post(BASE_API_URL + "Auth/Login", credentials);
    }
}