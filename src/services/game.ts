import player from "./player";
import windowController from "./windowController";
import { heightModifier } from "../utils/modifiers";
import { ratio } from "../utils/ratio";
import { townBackground, mapBackground } from "./backgrounds";
import { WindowDimensions } from "../types/game";

export const mainLoop = async (
  tick: number,
  context: any,
  width: number,
  height: number,
  windowDimensions: WindowDimensions
) => {
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, width, height);

  if (windowController.justChanged) {
    windowController.justChanged = false;
    const oldStaticHeight = windowController.oldHeight * heightModifier;
    const oldCanvasWidth = ratio * oldStaticHeight;
    const oldSeenPercentage = windowController.oldWidth / oldCanvasWidth;
    const oldLeftToX = (player.left - 0.5) * oldSeenPercentage;
    const oldX = ((player.x + oldLeftToX) * oldCanvasWidth) / oldCanvasWidth;
    player.x = oldX;
    player.left = 0.5;
  }

  const playerBg = width * player.getX();
  const half = windowDimensions.width / 2;
  let from = playerBg - half;
  const margin = windowDimensions.width * 0.05;
  const actualWidth = (width * 0.5 - half) * 2;

  if (from < -margin) {
    from = -margin;
    player.setReachedBorder();
  } else if (from > actualWidth + margin) {
    from = actualWidth + margin;
    player.setReachedBorder(false);
  } else {
    player.setReachedBorder(true, false);
    player.setReachedBorder(false, false);
  }

  context.translate(-from, 0);
  context.drawImage(
    player.location === "town" ? townBackground : mapBackground,
    0,
    0,
    player.location === "town" ? townBackground.width : mapBackground.width,
    player.location === "town" ? townBackground.height : mapBackground.height,
    0,
    0,
    width,
    height
  );
  context.translate(from, 0);

  player.drawPlayer(context, windowDimensions);

  if (
    windowDimensions.width === document.documentElement.clientWidth &&
    windowDimensions.height === document.documentElement.clientHeight
  ) {
    requestAnimationFrame((tick) =>
      mainLoop(tick, context, width, height, windowDimensions)
    );
  }
};
