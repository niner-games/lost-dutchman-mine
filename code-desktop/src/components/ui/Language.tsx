import React from "react";
import { LanguageProps } from "../../types/menu";

function Language({ language, setLanguage }: LanguageProps) {

    return (
        <>
            <label htmlFor="language">Language</label>
            <select name="language">
                <option></option>
            </select>
        </>
    )
}

export default Language;