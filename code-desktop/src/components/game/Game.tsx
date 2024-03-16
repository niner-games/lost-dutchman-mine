import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import GameMenu from "../ui/GameMenu";
import PauseScreen from "../ui/PauseScreen";
import { mainLoop } from "../../services/game";
import player from "../../services/player";
import { SaveGameProps } from "../../types/game";

function Game({ savedGame, setGameState, windowDimensions, saveGame, loadGame }: SaveGameProps) {
    const ratio = useMemo(() => 12.7675752773, [])
    // Height of the background
    const staticHeight = useMemo(() => windowDimensions.height * 0.6 - 20, [windowDimensions.height])
    // Width of the background
    const canvasWidth = useMemo(() => ratio * staticHeight, [staticHeight]);
    const [opened, setOpened] = useState('game');

    const canvasRef = useRef(null);

    useEffect(() => {
        if (opened === 'game') {
            const canvas = canvasRef.current;
            if (canvas) {
                const context = canvas.getContext('2d');
                canvas.width = canvasWidth;
                canvas.height = staticHeight;
                player.stopPause();
                requestAnimationFrame((tick) => mainLoop(tick, context, canvasWidth, staticHeight, savedGame.location, windowDimensions));
            }
        } else {
            player.startPause();
        }
    }, [canvasWidth, staticHeight, savedGame.location, opened, windowDimensions])

    useEffect(() => {
        // Event listeners for moving player
        document.addEventListener('keydown', (e) => player.setKeyPressed(e.key));
        document.addEventListener('keyup', (e) => player.setKeyPressed(null));
        document.addEventListener('click', (e) => player.mouseMoveHandler(e, windowDimensions.width, canvasWidth));
        
        return () => {
            document.removeEventListener('keydown', (e) => player.setKeyPressed(e.key));
            document.removeEventListener('keyup', (e) => player.setKeyPressed(null));
            document.removeEventListener('click', (e) => player.mouseMoveHandler(e, windowDimensions.width, canvasWidth));

            const interval_id = setInterval(function(){}, Number.MAX_SAFE_INTEGER);

            for (let i = 1; i < Number(interval_id); i += 1) {
                clearInterval(i);
            }
        }
    }, [windowDimensions, canvasWidth, opened])

    if (opened === 'pause') {
        return (
            <PauseScreen setOpened={setOpened} saveGame={saveGame} loadGame={loadGame} initialGameName={savedGame.saveName} />
        )
    }

    return (
        <div>
            <canvas style={{
                marginTop: '20px',
            }} ref={canvasRef} />
            <GameMenu setOpened={setOpened} gameState={savedGame} />
        </div>
    )
}

export default Game;
