import React from "react";
import { SavedGame, WindowDimensions } from "./game";

export type IconProps = {
  isOpen: boolean;
};

export type Option = {
  value: string;
  label: ReactNode;
};

export type CustomSelectProps = {
  placeHolder: string;
  options: Option[];
  onChange: Function;
  selected: string;
  align?: string;
};

export type TextProps = {
  text: string;
  classes?: string;
};

export type BottomMenuButtonsProps = {
  setOpened: Function;
};

export type GameTitle = {
  parentWidth: number;
  parentHeight: number;
};

export type ResizeUIProps = {
  windowDimensions?: WindowDimensions;
  widthPixels?: number;
};

export interface InGameMenuProps extends BottomMenuButtonsProps {
  gameState: SavedGame;
  windowDimensions: WindowDimensions;
}

export interface MenuButtonProps extends TextProps {
  clickHandler: MouseEventHandler<HTMLButtonElement>;
}

export type SplashScreenProps = {
  windowDimensions: WindowDimensions;
  opacity: number;
  setScreen: Function;
  setOpacity: Function;
  setLastUpdate: Function;
  isOwnOpacity: boolean;
  setIsOwnOpacity: Function;
  lastUpdate: number;
};

export type DownMenuButtonProps = {
  backgroundImage?: string;
  image?: string;
  text?: string;
  callback?: Function;
  valueToPass?: unknown;
};

export type InfoBoxProps = {
  setOpened: Function;
};

export type StartScreenProps = {
  setScreen: React.Dispatch<React.SetStateAction<string>>;
};

export type LanguageProps = {
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
};

export interface MenuProps extends LanguageProps {
  setScreen: React.Dispatch<React.SetStateAction<string>>;
}
