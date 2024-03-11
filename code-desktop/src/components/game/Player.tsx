import React, { useMemo } from "react";
import idleDown from "../../animations/player/down/idle.png";
import idleUp from "../../animations/player/up/idle.png";
import idleLeft from "../../animations/player/left/idle.png";
import idleRight from "../../animations/player/right/idle.png";
import { setText } from "../../context/language";
import { GameProps, AnimationsEngine } from "../../types/game";

function Player({ savedGame, windowDimensions, setGameState }: GameProps) {
    const ratio = useMemo(() => 3.0, []);
    const animations: AnimationsEngine = useMemo(() => {
        return {
            down: {
                idle: [idleDown],
            },
            up: {
                idle: [idleUp],
            },
            left: {
                idle: [idleLeft],
            },
            right: {
                idle: [idleRight],
            }
        }
    }, [])

    return <img 
        src={animations[savedGame.playerPosition.direction][savedGame.playerPosition.currentAnimation][savedGame.playerPosition.frame]}
        height={(windowDimensions.height * 0.6 ) / ratio}
        alt={setText('player')}
        style={{ 
            position: 'absolute', 
            transition: 'linear', 
            top: `${savedGame.playerPosition.y * 100}%`,
            left: '50%',
            transform: 'translate(-50%, -50%)',
        }}
    />
}

export default Player;