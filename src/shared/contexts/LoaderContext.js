import { createContext, useContext, useState } from "react";
import instance from "../../core/utils/axiosInterceptors";


export const LoaderContext = createContext();

export const useLoader = () => {
    return useContext(LoaderContext);
}

// Provider
export const LoaderProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    // 3 istek
    // A => true => 5 sn => 3sn
    // B => true => 2 sn => false
    // C => true => 5 sn => 3sn
    // TODO
    instance.interceptors.request.use((config) => {
        setIsLoading(true);
        return config;
    });

    instance.interceptors.response.use((response) => {
        setIsLoading(false);
        return response;
    }, (error) => {
        setIsLoading(false);
        return Promise.reject(error);
    })

    return (<LoaderContext.Provider value={{ isLoading }}>
        {children}
    </LoaderContext.Provider>)
}