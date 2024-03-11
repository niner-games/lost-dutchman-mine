import React from "react";
import { SavedGame } from "./game"

export type TextProps = {
    text: string,
    classes?: string,
}

export type BottomMenuButtonsProps = {
    setOpened: Function;
}

export interface InGameMenuProps extends BottomMenuButtonsProps {
    gameState: SavedGame,
}

export interface MenuButtonProps extends TextProps {
    clickHandler: MouseEventHandler<HTMLButtonElement>,
}

export type DownMenuButtonProps = {
    backgroundImage?: string, 
    image?: string,  
    text?: string, 
    callback?: Function,
    valueToPass?: unknown,
}

export type LanguageProps = {
    language: string;
    setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

export interface MenuProps extends LanguageProps {
    loadGame: Function;
    setScreen: React.Dispatch<React.SetStateAction<string>>;
};