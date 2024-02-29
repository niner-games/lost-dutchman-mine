import React, { useCallback } from "react";
import Language from "./Language";
import MenuButton from "../common/MenuButton";
import Title from "../common/Title";
import { MenuProps } from "../../types/menu";

function Menu({ loadGame, setScreen, language, setLanguage }: MenuProps) {
    const quitGame = useCallback(() => {
        window.close();
    }, []);

    const startNewGame = useCallback(() => {
        setScreen('game')
    }, [])

    return (
        <div>
            <Title classes="center white" text="Main Menu" />
            <Language language={language} setLanguage={setLanguage} />
            <MenuButton clickHandler={startNewGame} text={'Start game'} />
            <MenuButton clickHandler={quitGame} text={'Quit game'} />
        </div>
    )
}

export default Menu;