import React, { useMemo } from "react";
import { ResizeUIProps } from "../../types/menu";
import { gameTitleRatio } from "../../utils/ratio";

function GameTitle({ widthPixels }: ResizeUIProps) {
  const fontSize = useMemo(() => widthPixels / 9, [widthPixels]);

  return (
    <div>
      <h2
        className="title-on-board"
        style={{
          fontSize: `${fontSize}px`,
          lineHeight: `${fontSize / gameTitleRatio}px`,
        }}
      >
        Lost <br /> Dutchman <br />
        Mine{" "}
        <span
          className="trademark"
          style={{
            fontSize: `${fontSize / 3}px`,
            lineHeight: `${fontSize / gameTitleRatio / 3}px`,
          }}
        >
          TM
        </span>
      </h2>
    </div>
  );
}

export default GameTitle;
