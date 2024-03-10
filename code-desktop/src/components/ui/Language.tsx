import React, { useCallback } from "react";
import { setText } from "../../context/language";
import { LanguageProps } from "../../types/menu";

function Language({ language, setLanguage }: LanguageProps) {
    const chooseAndSaveLanguage = useCallback((lang: string) => {
        setLanguage(lang);
        window.localStorage.setItem('language', lang);
    }, [])

    return (
        <>
            <label htmlFor="language" className="white">{setText('language')}</label>
            <select name="language" onChange={(e) => chooseAndSaveLanguage(e.target.value)} value={language}>
                <option value={'en'}>EN</option>
                <option value={'pl'}>PL</option>
                <option value={'ger'}>GER</option>
                <option value={'sp'}>SP</option>
                <option value={'fr'}>FR</option>
                <option value={'ua'}>UA</option>
                <option value={'sil'}>SIL</option>
            </select>
        </>
    )
}

export default Language;