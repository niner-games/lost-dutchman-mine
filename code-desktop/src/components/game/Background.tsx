import React, { useMemo } from "react";
import { BackgroundProps } from "../../types/game";

function Background({ image, savedGame, windowDimensions }: BackgroundProps) {
    const ratio = useMemo(() => 12.7675752773, []);
    const staticHeight = useMemo(() => windowDimensions.height * 0.6 - 20, [windowDimensions.height])
    const canvasWidth = useMemo(() => ratio * staticHeight, [staticHeight]);

    return <img 
    src={image} 
    alt={savedGame.backgroundAlt}
    height={staticHeight} 
    style={{ 
        position: 'absolute', 
        transition: 'linear',
        left: -(canvasWidth * savedGame.playerPosition.x) + windowDimensions.width/2,
        top: '20px',
    }}
/>
}

export default Background;