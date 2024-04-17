import React, { useEffect, useCallback } from "react";
import Subtitle from "../common/Subtitle";
import splash from "../../images/ui/cover.png";
import introSound from "../../sounds/intro.wav";
import { setText } from "../../context/language";
import { version } from "../../../package.json";
import { SplashScreenProps } from "../../types/menu";

let lastTick = 0;
let ownOpacity = 1;

function SplashScreen({
  windowDimensions,
  opacity,
  setScreen,
  setLastUpdate,
  setIsOwnOpacity,
  isOwnOpacity,
  lastUpdate,
}: SplashScreenProps) {
  const setOpacity = useCallback((value: number) => {
    if (value > 1) value = 1;
    if (value < 0) value = 0;
    ownOpacity = value;
  }, []);

  const animationFrame = useCallback(
    (tick: number) => {
      if (lastTick === 0) lastTick = tick;
      const delta = tick - lastTick;
      lastTick = tick;
      setOpacity(ownOpacity - (0.1 * delta) / 100);
      setLastUpdate(new Date().getTime());

      if (ownOpacity > 0.2) {
        requestAnimationFrame(animationFrame);
      } else {
        setScreen("menu");
      }
    },
    [isOwnOpacity]
  );

  // Function to animate splash screen
  const setSplashAnimationLoop = useCallback(() => {
    setIsOwnOpacity(true);
    ownOpacity = opacity;
    requestAnimationFrame(animationFrame);
  }, [lastUpdate]);

  useEffect(() => {
    // On any press even, change splash screen to menu
    const handleKeyPress = () => {
      if (isOwnOpacity) return;
      setSplashAnimationLoop();
    };

    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("mousedown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("mousedown", handleKeyPress);
    };
  }, [setScreen, lastUpdate, isOwnOpacity]);

  return (
    <div>
      <img
        src={splash}
        alt="Background splash screen"
        width={windowDimensions.width}
        height={windowDimensions.height}
        style={{
          opacity: isOwnOpacity ? ownOpacity : opacity,
          transition: "linear",
        }}
      />

      <audio
        autoPlay
        src={introSound}
        onEnded={() => {
          if (isOwnOpacity) return;
          setSplashAnimationLoop();
        }}
      ></audio>
      <Subtitle
        text={setText("startup", "(press any key or click to continue)")}
        classes="white absolute top-with-small-margin no-margin left z-index-1 text-shadow"
      />
      <Subtitle
        text={version}
        classes="white absolute bottom-with-small-margin left no-margin z-index-1 text-shadow"
      />
    </div>
  );
}

export default SplashScreen;
