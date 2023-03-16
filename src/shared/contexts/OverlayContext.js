import { createContext, useContext, useState } from "react";


export const OverlayContext = createContext();

export const useOverlay = () => {
    return useContext(OverlayContext);
}


export const OverlayProvider = ({ children }) => {

    const [show, setShow] = useState(false)

    return <OverlayContext.Provider value={{ show, setShow }}>
        {children}
    </OverlayContext.Provider>
}