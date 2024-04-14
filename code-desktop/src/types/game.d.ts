import { Item } from './items';

type PlayerPosition = {
    x: number;
    y: number;
};

export type SavedGame = {
    uuid: string;
    saveName: string;
    location: string;
    backgroundAlt: string;
    foodInventory: Array<Array<Item | null>>;
    toolInventory: Array<Array<Item | null>>;
    playerPosition: PlayerPosition;
    mercantileItems: Item[];
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

export type Directions = {
    idx: number, 
    name: string, 
    vec: {
        x: number, 
        y: number
    }
}

export interface GameProps extends GameAndDimension {
    setGameState:React.Dispatch<React.SetStateAction<SavedGame>>;
};

export interface SaveGameProps extends GameProps {
    saveGame:Function;
    loadGame:Function;
}