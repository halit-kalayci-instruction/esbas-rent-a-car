import { createContext, useContext, useState } from "react";


export const OverlayContext = createContext();

export const useOverlay = () => {
    return useContext(OverlayContext);
}


export const OverlayProvider = ({ children }) => {

    const [show, setShow] = useState(false);
    const [modalInformation, setModalInformation] = useState({
        title: "",
        cancelBtnText: "Cancel",
        submitBtnText: "Submit",
        body: <></>,
        footer: undefined,
        show: true,
        submitBtnClick: () => { },
        onCloseClick: () => { },
        cancelBtnClick: () => { },
        reRender: true
    })


    const setAndShow = (modalInfo) => {
        setModalInformation({ ...modalInformation, ...modalInfo });
        setShow(true);
    }

    return <OverlayContext.Provider value={{ show, setShow, modalInformation, setModalInformation, setAndShow }}>
        {children}
    </OverlayContext.Provider>
}