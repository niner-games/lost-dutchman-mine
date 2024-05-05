import { SavedGame } from "./game";

export type SaveListProps = {
  saves: SavedGame[];
  setChosenGame: Function;
};

export type PauseScreenProps = {
  inMenu?: boolean;
  setOpened: Function;
  loadGame: Function;
  saveGame: Function;
  removeGame: Function;
  initialGameName?: string;
};
