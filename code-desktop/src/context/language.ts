import english from "../language/en.json";
import polish from "../language/pl.json";

const languageContext: any = {
    en: english,
    pl: polish,
}

export const setText = (text: string) => {
    const lang = window.localStorage.getItem('language') || 'en';
    return languageContext[lang][text] || languageContext.en[text];
}
