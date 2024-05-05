import React, { useMemo } from "react";
import { setText } from "../../context/language";
import { ResizeUIProps } from "../../types/menu";

function GameTitle({ windowDimensions }: ResizeUIProps) {
  const ratio = useMemo(() => 60.3376 / 50.1747, []);
  const widthPixels = useMemo(
    () => (1134.9712917023096663815226689478 * windowDimensions.width) / 3840,
    [windowDimensions]
  );
  const fontSize = useMemo(() => widthPixels / 5.7586, [widthPixels]);

  return (
    <div>
      <h2
        className="title-on-board"
        style={{
          fontSize: `${fontSize}px`,
          lineHeight: `${fontSize / ratio}px`,
        }}
      >
        Lost <br /> Dutchman <br />
        Mine{" "}
        <span
          className="trademark"
          style={{
            fontSize: `${fontSize / 3}px`,
            lineHeight: `${fontSize / ratio / 3}px`,
          }}
        >
          TM
        </span>
      </h2>
    </div>
  );
}

export default GameTitle;
