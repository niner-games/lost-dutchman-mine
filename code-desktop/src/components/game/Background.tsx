import React from "react";
import { BackgroundProps } from "../../types/game";

const ratio = 12.7675752773;

function Background({ image, savedGame, windowDimensions }: BackgroundProps) {
    const canvasWidth = ratio * windowDimensions.height;

    return <img 
    src={image} 
    alt={savedGame.backgroundAlt}
    height={windowDimensions.height} 
    style={{ 
        position: 'absolute', 
        transition: 'linear',
        left: -(canvasWidth * savedGame.playerPosition.x) + windowDimensions.width/2,
        top: '0',
    }}
/>
}

export default Background;