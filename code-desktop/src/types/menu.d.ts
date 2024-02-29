import React from "react";

export type TextProps = {
    text: string,
    classes?: string,
}

export interface MenuButtonProps extends TextProps {
    clickHandler: MouseEventHandler<HTMLButtonElement>,
}

export type LanguageProps = {
    language: string;
    setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

export interface MenuProps extends LanguageProps {
    loadGame: Function;
    setScreen: React.Dispatch<React.SetStateAction<string>>;
};