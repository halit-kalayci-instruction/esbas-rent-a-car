import toastr from "toastr";
import AuthService from "../../features/auth/services/authService";
import instance from "./axiosInterceptors";
import store from "../../store/configureStore";
import { RefreshUser } from "../../store/actions/authActions";
import { setItem } from "./localStorage";

// Subscriber



export const handleBusinessException = (error) => {
    toastr.error(error.Detail);
}
export const handleValidationException = (error) => {
    error.Failures.forEach(fail => {
        toastr.error(fail.ErrorMessage);
    })
}
export const handleAuthException = async (error) => {
    // Bu hatayı neden aldım?
    // token var, süresi geçmemiş => rol yetersiz
    // Requestin kopyasının tutularak retry yapılması
    const originialRequest = error.config;
    originialRequest._retry = true;
    //return axios(originialRequest);
    // async-await
    let response = await instance.get('Auth/RefreshToken');
    let token = response.data.token;
    setItem('token', token);
    // let state = store.getState();
    // if (token) {
    //     let userInfo = jwt_decode(token);
    //     state.auth = { authenticated: true, user: userInfo, roles: userInfo[ROLES] }
    // }
    // else
    //     state.auth = { authenticated: false, user: null, roles: [] };
    store.dispatch(RefreshUser());
    window.dispatchEvent(new Event('changeValue'))
    window.dispatchEvent(new Event('storage'))
    originialRequest.headers.Authorization = `Bearer ${token}`;
    return instance(originialRequest);
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