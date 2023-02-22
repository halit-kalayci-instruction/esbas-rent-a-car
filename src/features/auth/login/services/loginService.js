import axios from "axios";
import { BASE_API_URL } from "../../../../enviroment";

export default class LoginService {
    // axios
    login(credentials) {
        return axios.post(BASE_API_URL + "Auth/Login", credentials);
    }
}