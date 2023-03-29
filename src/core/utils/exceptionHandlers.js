import toastr from "toastr";
import { getItem, setItem } from "./localStorage";
import jwt_decode from "jwt-decode"
import AuthService from "../../features/auth/services/authService";
export const handleBusinessException = (error) => {
    toastr.error(error.Detail);
}
export const handleValidationException = (error) => {
    error.Failures.forEach(fail => {
        toastr.error(fail.ErrorMessage);
    })
}
export const handleAuthException = () => {
    // Bu hatayı neden aldım?
    // token var, süresi geçmemiş => rol yetersiz
    let token = getItem("token");
    let userInfo = jwt_decode(token);
    let expired = Date.now() >= userInfo.exp * 1000;
    if (!token || expired) {
        // refresh-token
        refreshToken();
        return;
    }
    toastr.error("Bu işlemi yapmaya yetkiniz bulunmamaktadır.")
}

export const refreshToken = () => {
    //TODO: coredan taşı
    let authService = new AuthService();
    authService.refreshToken().then(response => {
        setItem("token", response.data.token);
        //? Re-send request?
    });
}

export const handleDefaultException = (error) => {
    toastr.error(error.Detail);
}

// Bilinmedik (frontendde ele alınmayan) hata türleri
export const handleUnknownException = (error) => {
    toastr.error("Bilinmedik hata");
}