import React, { useMemo } from "react";
import clock from "../../images/ui/clock.png";
import { ResizeUIProps } from "../../types/menu";

function CurrentTime({ windowDimensions }: ResizeUIProps) {
  const width = useMemo(() => {
    let toReturn = "12.083333333vw";

    if (windowDimensions.width * 0.12 > windowDimensions.height * 0.19) {
      toReturn = "19vh";
    }

    return toReturn;
  }, [windowDimensions]);

  return (
    <div
      style={{
        position: "relative",
        textAlign: "center",
      }}
    >
      {/* HOURS */}
      <div
        style={{
          width: "10px",
          height: "30px",
          background: "#000",
          position: "absolute",
        }}
      ></div>
      {/* MINUTES */}
      <div
        style={{
          width: "10px",
          height: "60px",
          background: "#000",
          position: "absolute",
        }}
      ></div>

      <img
        src={clock}
        alt="Clock"
        style={{
          width,
          filter: "drop-shadow(rgb(109, 77, 0) 10px 10px 5px)",
        }}
      />
    </div>
  );
}

export default CurrentTime;
