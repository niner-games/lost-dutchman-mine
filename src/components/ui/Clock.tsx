import React from "react";
import CurrentTime from "./CurrentTime";
import DayBoard from "./DayBoard";
import { ResizeUIProps } from "../../types/menu";

function Clock({ windowDimensions }: ResizeUIProps) {
  return (
    <div>
      <CurrentTime windowDimensions={windowDimensions} />
      <DayBoard />
    </div>
  );
}

export default Clock;
