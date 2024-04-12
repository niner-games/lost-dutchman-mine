import player from "./player";
import { townBackground, mapBackground } from "./backgrounds";
import { WindowDimensions } from "../types/game";

export const mainLoop = async (tick: number, context: any, width: number, height: number, image: string, windowDimensions: WindowDimensions) => {
    context.setTransform(1,0,0,1,0,0);
    context.clearRect(0,0, width, height);
    const playerBg = width * player.getX();
    const half = windowDimensions.width / 2;
    const from = playerBg - half;
    context.translate (-from, 0);
    context.drawImage(
        image === 'town' ? townBackground : mapBackground, 
        0, 
        0, 
        image === 'town' ? townBackground.width : mapBackground.width, 
        image === 'town' ? townBackground.height : mapBackground.height, 
        0, 
        0, 
        width, 
        height
    ); 
    context.translate(from, 0);
    
    player.drawPlayer(context, windowDimensions);

    if (windowDimensions.width === window.innerWidth && windowDimensions.height === window.innerHeight) {
        requestAnimationFrame((tick) => mainLoop(tick, context, width, height, image, windowDimensions));
    }
}
