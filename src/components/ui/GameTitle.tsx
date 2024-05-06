import React, { useMemo } from "react";
import { ResizeUIProps } from "../../types/menu";

function GameTitle({ widthPixels }: ResizeUIProps) {
  const ratio = useMemo(() => 60.3376 / 50.1747, []);
  const fontSize = useMemo(() => widthPixels / 9, [widthPixels]);

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
