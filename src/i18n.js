import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            welcomeText: "Hello, welcome",
            greetings: "Hi"
        }
    },
    tr: {
        translation: {
            welcomeText: "Merhabalar, hoş geldiniz",
            greetings: "Merhaba"
        }
    }
}

i18n.use(initReactI18next).init({
    resources,
    lng: 'en'
})

export default i18n;
// <h3> {translate('welcomeText')} </h3>