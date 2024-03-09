import React, { useMemo } from "react";
import idleDown from "../../animations/player/down/idle.png";
import idleUp from "../../animations/player/up/idle.png";
import idleLeft from "../../animations/player/left/idle.png";
import idleRight from "../../animations/player/right/idle.png";
import { GameProps, AnimationsEngine } from "../../types/game";

function Player({ savedGame, windowDimensions, setGameState }: GameProps) {
    const animations: any = useMemo(() => {
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
        alt={"Player"}
        style={{ 
            position: 'absolute', 
            transition: 'linear', 
            top: '80%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        }}
    />
}

export default Player;