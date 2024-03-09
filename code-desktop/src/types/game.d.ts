type PlayerPosition = {
    x: number;
    y: number;
    direction: string;
    currentAnimation: string;
    frame: number;
};

type SavedGame = {
    location: string;
    backgroundAlt: string;
    playerPosition: PlayerPosition;
};

type WindowDimensions = {
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