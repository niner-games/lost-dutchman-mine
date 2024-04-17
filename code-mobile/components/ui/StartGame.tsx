import React, { useEffect } from "react";
import Title from "../common/Title";
import Subtitle from "../common/Subtitle";
import { StartScreenProps } from "../../types/menu";
import { version } from "../../../package.json";

function StartGame({ setScreen }: StartScreenProps) {
  useEffect(() => {
    const handleKeyPress = () => {
      setScreen("splash");
    };

    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("mousedown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("mousedown", handleKeyPress);
    };
  }, []);

  return (
    <div>
      <Title text="Press any button to start a game" />
      <Subtitle
        text={version}
        classes="white absolute bottom-with-small-margin left no-margin z-index-1 text-shadow"
      />
    </div>
  );
}

export default StartGame;
