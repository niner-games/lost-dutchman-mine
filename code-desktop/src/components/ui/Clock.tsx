import React from "react";
import CurrentTime from "./CurrentTime";
import DayBoard from "./DayBoard";

function Clock() {

    return (
        <div>
            <CurrentTime />
            <DayBoard />
        </div>
    )
}

export default Clock;