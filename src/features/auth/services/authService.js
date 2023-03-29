import instance from "../../../core/utils/axiosInterceptors";
import { BASE_API_URL } from "../../../enviroment";

export default class AuthService {
    login(credentials) {
        return instance
            .post("Auth/Login", credentials);
    }

    refreshToken() {
        return instance.get("Auth/RefreshToken")
    }
}