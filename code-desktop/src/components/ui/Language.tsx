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
            <label htmlFor="language" className="white">{'Language'}</label>
            <select name="language" onChange={(e) => chooseAndSaveLanguage(e.target.value)} value={language}>
                <option value={'en'}>EN</option>
                <option value={'pl'}>PL</option>
                <option value={'de'}>DE</option>
                <option value={'es'}>ES</option>
                <option value={'fr'}>FR</option>
                <option value={'it'}>IT</option>
                <option value={'sx'}>SX</option>
                <option value={'hi'}>HI</option>
                <option value={'uk'}>UK</option>
            </select>
        </>
    )
}

export default Language;