import React, { useCallback, useMemo } from "react";
import CustomSelect from "../common/CustomSelect";
import { setText } from "../../context/language";
import { LanguageProps } from "../../types/menu";
import en from "../../images/ui/flags/gb.svg";
import pl from "../../images/ui/flags/pl.svg";
import de from "../../images/ui/flags/de.svg";
import es from "../../images/ui/flags/es.svg";
import fr from "../../images/ui/flags/fr.svg";
import it from "../../images/ui/flags/it.svg";
import sx from "../../images/ui/flags/sil-coat.png";
import hi from "../../images/ui/flags/in.svg";
import uk from "../../images/ui/flags/ua.svg";

function Language({ setLanguage }: LanguageProps) {
    const options = useMemo(() => {
        return [
            {
                label: <img src={en} alt="en" className="flag-select" />,
                value: 'en'
            },
            {
                label: <img src={pl} alt="pl" className="flag-select" />,
                value: 'pl'
            },
            {
                label: <img src={de} alt="de" className="flag-select" />,
                value: 'de'
            },
            {
                label: <img src={es} alt="es" className="flag-select" />,
                value: 'es'
            },
            {
                label: <img src={fr} alt="fr" className="flag-select" />,
                value: 'fr'
            },
            {
                label: <img src={it} alt="it" className="flag-select" />,
                value: 'it'
            },
            {
                label: <img src={sx} alt="sx" className="flag-select" />,
                value: 'sx'
            },
            {
                label: <img src={hi} alt="hi" className="flag-select" />,
                value: 'hi'
            },
            {
                label: <img src={uk} alt="uk" className="flag-select" />,
                value: 'uk'
            }
        ]
    }, [])

    const chooseAndSaveLanguage = useCallback((lang: string) => {
        setLanguage(lang);
        window.localStorage.setItem('language', lang);
    }, [])

    return (
        <>
            <label htmlFor="language" className="white">{'Language'}</label>
            <CustomSelect placeHolder="language" options={options} onChange={chooseAndSaveLanguage} selected={window.localStorage.getItem('language') || 'en'} />
        </>
    )
}

export default Language;