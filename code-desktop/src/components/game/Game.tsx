import React, { useState } from "react";
import Player from "./Player";
import Background from "./Background";
import GameMenu from "../ui/GameMenu";
import PauseScreen from "../ui/PauseScreen";
import { SaveGameProps } from "../../types/game";
import map from "../../images/map/map.png";
import town from "../../images/map/town.png";

function Game({ savedGame, setGameState, windowDimensions, saveGame }: SaveGameProps) {
    const [opened, setOpened] = useState('game');

    if (opened === 'pause') {
        return (
            <PauseScreen setOpened={setOpened} saveGame={saveGame} />
        )
    }

    return (
        <>
            {
                savedGame.location === "town" ? 
                    <Background image={town} savedGame={savedGame} windowDimensions={windowDimensions} /> : 
                    <Background image={map} savedGame={savedGame} windowDimensions={windowDimensions} />
            } 

            <Player savedGame={savedGame} windowDimensions={windowDimensions} setGameState={setGameState} />
            <GameMenu setOpened={setOpened} gameState={savedGame} />
        </>
    );
}

export default Game;