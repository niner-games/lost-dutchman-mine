import React, { useState, useMemo, useRef, useEffect } from "react";
import Text from "../common/Text";
import MarginOverlay from "../ui/MarginOverlay";
import GameMenu from "../ui/GameMenu";
import PauseScreen from "../ui/PauseScreen";
import { mainLoop } from "../../services/game";
import player from "../../services/player";
import { SaveGameProps } from "../../types/game";
import { ratio } from "../../utils/ratio";
import { heightModifier } from "../../utils/modifiers";
import { getWindowDimensions } from "../../utils/window";

function Game({
  savedGame,
  setGameState,
  windowDimensions,
  saveGame,
  loadGame,
  removeGame,
}: SaveGameProps) {
  // Height of the background
  const staticHeight = useMemo(
    () => windowDimensions.height * heightModifier,
    [windowDimensions.height]
  );
  // Width of the background
  const canvasWidth = useMemo(() => ratio * staticHeight, [staticHeight]);
  const [opened, setOpened] = useState("game");
  const [info, setInfo] = useState("");

  const canvasRef = useRef(null);

  useEffect(() => {
    const { width, height } = getWindowDimensions();

    if (opened === "game" && width > height) {
      const canvas = canvasRef.current;
      if (canvas) {
        const context = canvas.getContext("2d");
        canvas.width = canvasWidth;
        canvas.height = staticHeight;
        player.stopPause();
        requestAnimationFrame((tick) =>
          mainLoop(tick, context, canvasWidth, staticHeight, windowDimensions)
        );
      }
    } else {
      player.startPause();
    }
  }, [canvasWidth, staticHeight, savedGame.location, opened, windowDimensions]);

  useEffect(() => {
    // Event listeners for moving player
    document.addEventListener("keydown", (e) => player.setKeyPressed(e.key));
    document.addEventListener("keyup", (e) => player.setKeyPressed(null));
    document.addEventListener("click", (e) =>
      player.mouseMoveHandler(e, windowDimensions.width, canvasWidth)
    );

    document.addEventListener("touchstart", (e) =>
      player.mouseMoveHandler(e.touches[0], windowDimensions.width, canvasWidth)
    );

    return () => {
      document.removeEventListener("keydown", (e) =>
        player.setKeyPressed(e.key)
      );
      document.removeEventListener("keyup", (e) => player.setKeyPressed(null));
      document.removeEventListener("click", (e) =>
        player.mouseMoveHandler(e, windowDimensions.width, canvasWidth)
      );
      document.removeEventListener("touchstart", (e) =>
        player.mouseMoveHandler(
          e.touches[0],
          windowDimensions.width,
          canvasWidth
        )
      );
    };
  }, [windowDimensions, canvasWidth, opened]);

  if (opened === "pause") {
    return (
      <PauseScreen
        setOpened={setOpened}
        saveGame={saveGame}
        loadGame={loadGame}
        initialGameName={savedGame.saveName}
        removeGame={removeGame}
      />
    );
  }

  return (
    <div>
      <MarginOverlay left={true} />
      <MarginOverlay />
      <div
        style={{
          height: "4.90740740740741vh",
          marginLeft: "5vw",
          marginRight: "5vw",
        }}
      >
        <Text text={info} classes="red info left no-vertical-margin" />
      </div>
      <canvas ref={canvasRef} id="game-canvas" />
      <GameMenu
        setOpened={setOpened}
        gameState={savedGame}
        windowDimensions={windowDimensions}
      />
    </div>
  );
}

export default Game;
