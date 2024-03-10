import React from "react";
import Player from "./Player";
import Background from "./Background";
import { SaveGameProps } from "../../types/game";
import map from "../../images/map/map.png";
import town from "../../images/map/town.png";

function Game({ savedGame, setGameState, windowDimensions, saveGame }: SaveGameProps) {
    return (
        <>
            {
                savedGame.location === "town" ? 
                    <Background image={town} savedGame={savedGame} windowDimensions={windowDimensions} /> : 
                    <Background image={map} savedGame={savedGame} windowDimensions={windowDimensions} />
            } 

            <Player savedGame={savedGame} windowDimensions={windowDimensions} setGameState={setGameState} />
        </>
    );
}

export default Game;