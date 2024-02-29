type PlayerPosition = {
    x: number;
    y: number;
    direction: string;
    currentAnimation: string;
}

type SavedGame = {
    location: string;
    backgroundAlt: string;
    playerPosition: PlayerPosition;
};

type WindowDimensions = {
    height: number;
    width: number;
}

export type BackgroundProps = {
    image: string;
    savedGame: SavedGame;
    windowDimensions: WindowDimensions;
}

export type GameProps = {
    savedGame: SavedGame;
    setGameState:React.Dispatch<React.SetStateAction<SavedGame>>;
    windowDimensions: WindowDimensions;
};