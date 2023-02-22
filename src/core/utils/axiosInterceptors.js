import axios from "axios";
import { BASE_API_URL } from "../../enviroment";
import { getItem } from "./localStorage";


const instance = axios.create({
    baseURL: BASE_API_URL
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${getItem("token")}`

    return config;
})

//TODO: Response Interceptor

export default instance;
