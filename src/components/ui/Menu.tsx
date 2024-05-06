import React, { useCallback } from "react";
import { App } from "@capacitor/app";
import Language from "./Language";
import MenuButton from "../common/MenuButton";
import Title from "../common/Title";
import { MenuProps } from "../../types/menu";

function Menu({ setScreen, setLanguage }: MenuProps) {
  const quitGame = useCallback(() => {
    try {
      App.exitApp();
    } catch (e) {
      // Do nothing
    }
    window.close();
  }, []);

  const startNewGame = useCallback(() => {
    setScreen("game");
  }, []);

  const loadGames = useCallback(() => {
    setScreen("load");
  }, []);

  return (
    <div>
      <Title classes="center white" text={"Main Menu"} />
      <Language setLanguage={setLanguage} />
      <MenuButton clickHandler={startNewGame} text={"Start Game"} />
      <MenuButton clickHandler={loadGames} text={"Load game"} />
      <MenuButton clickHandler={quitGame} text={"Quit game"} />
    </div>
  );
}

export default Menu;
