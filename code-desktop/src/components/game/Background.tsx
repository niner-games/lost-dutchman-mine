import React, { useMemo } from "react";
import { BackgroundProps } from "../../types/game";

function Background({ image, savedGame, windowDimensions }: BackgroundProps) {
    const ratio = useMemo(() => 12.7675752773, []);
    const canvasWidth = useMemo(() => ratio * windowDimensions.height, [windowDimensions]);

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