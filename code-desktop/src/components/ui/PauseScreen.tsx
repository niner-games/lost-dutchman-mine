import React, { useCallback, useState, useEffect } from "react";
import SaveList from "./SaveList";
import { SavedGame } from "../../types/game";
import { PauseScreenProps } from "../../types/pause";

function PauseScreen({ setOpened, saveGame }: PauseScreenProps) {
    const [savedGames, setSavedGames] = useState([]);
    const [choosenGame, setChoosenGame] = useState('');
    const [gameName, setGameName] = useState('');

    const getSavedGames = useCallback(() => {
        const gameToLoad: string | undefined = window.localStorage.getItem('saved-games');

        if (!gameToLoad) {
            setSavedGames([]);
        }

        try {
            setSavedGames(JSON.parse(gameToLoad));
        } catch(e) {
            setSavedGames([]);
        }
    }, []);

    useEffect(() => {
        getSavedGames();
    }, []);

    return (
        <div>
            <SaveList saves={savedGames} />
            <button onClick={() => {
                setOpened('game');
            }}>Resume game</button>
            <button disabled={gameName === ''} onClick={() => {
                saveGame(gameName);
                getSavedGames();
            }}>Save game</button>
            <input type="text" value={gameName} onChange={(e) => {
                setGameName(e.target.value);
            }}/>
            <button disabled={choosenGame === ''}>Load game</button>
            <button disabled={choosenGame === ''}>Remove game</button>
            <button onClick={() => {
                
            }}>Exit to menu</button>
            <button onClick={() => {
                window.close();
            }}>Exit to desktop</button>
        </div>
    )
}

export default PauseScreen;