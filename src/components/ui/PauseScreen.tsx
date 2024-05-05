import React, { useCallback, useState, useEffect } from "react";
import SaveList from "./SaveList";
import { PauseScreenProps } from "../../types/pause";

function PauseScreen({
  setOpened,
  saveGame,
  inMenu = false,
  loadGame,
  initialGameName = "",
  removeGame,
}: PauseScreenProps) {
  const [savedGames, setSavedGames] = useState([]);
  const [chosenGame, setChosenGame] = useState("");
  const [gameName, setGameName] = useState(initialGameName);

  // Get list of saved games from local storage
  const getSavedGames = useCallback(() => {
    const gameToLoad: string | undefined =
      window.localStorage.getItem("saved-games");

    if (!gameToLoad) {
      setSavedGames([]);
      return;
    }

    try {
      setSavedGames(JSON.parse(gameToLoad));
    } catch (e) {
      setSavedGames([]);
    }
  }, []);

  useEffect(() => {
    getSavedGames();
  }, []);

  return (
    <div>
      <SaveList saves={savedGames} setChosenGame={setChosenGame} />
      {inMenu ? null : (
        <>
          <button
            onClick={() => {
              setOpened("game");
              setChosenGame("");
            }}
          >
            Resume game
          </button>
          <button
            disabled={gameName === ""}
            onClick={() => {
              saveGame(gameName);
              getSavedGames();
              setChosenGame("");
            }}
          >
            Save game
          </button>
          <input
            type="text"
            value={gameName}
            onChange={(e) => {
              setGameName(e.target.value);
            }}
          />
        </>
      )}
      <button
        disabled={chosenGame === ""}
        onClick={() => {
          loadGame(chosenGame);
          setOpened("game");
        }}
      >
        Load game
      </button>
      <button
        disabled={chosenGame === ""}
        onClick={() => {
          removeGame(chosenGame);
          getSavedGames();
        }}
      >
        Remove game
      </button>
      <button
        onClick={() => {
          if (inMenu) {
            setOpened("menu");
          }
        }}
      >
        Exit to menu
      </button>
      <button
        onClick={() => {
          window.close();
        }}
      >
        Exit to desktop
      </button>
    </div>
  );
}

export default PauseScreen;
