import { createContext, useContext, useState } from "react";


export const HeadContext = createContext();

export const useHead = () => {
    return useContext(HeadContext);
}

// Provider
export const HeadProvider = ({ children }) => {
    const [title, setTitle] = useState("React App");
    const [metas, setMetas] = useState([])
    return (
        <HeadContext.Provider value={{ title, setTitle }}>
            {children}
        </HeadContext.Provider>
    )
}