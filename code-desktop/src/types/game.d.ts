type PlayerPosition = {
    x: number;
    y: number;
    direction: string;
    currentAnimation: string;
    frame: number;
};

export type SavedGame = {
    uuid: string;
    saveName: string;
    location: string;
    backgroundAlt: string;
    playerPosition: PlayerPosition;
};

export type WindowDimensions = {
    height: number;
    width: number;
};

type GameAndDimension = {
    savedGame: SavedGame;
    windowDimensions: WindowDimensions;
};

type DownAnimation = {
    idle: string[];
};

type UpAnimation = {
    idle: string[];
};

type LeftAnimation = {
    idle: string[];
};

type RightAnimation = {
    idle: string[];
};

export type AnimationsEngine = any;

export interface BackgroundProps extends GameAndDimension {
    image: string;
};

export interface GameProps extends GameAndDimension {
    setGameState:React.Dispatch<React.SetStateAction<SavedGame>>;
};

export interface SaveGameProps extends GameProps {
    saveGame:Function;
    loadGame:Function;
}