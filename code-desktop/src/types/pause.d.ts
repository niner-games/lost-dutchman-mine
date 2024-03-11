import { SavedGame } from "./game";

export type SaveListProps = {
    saves: SavedGame[]
}

export type PauseScreenProps = {
    setOpened: Function, 
    saveGame: Function, 
}