import React from "react";
import { setText } from "../../context/language";

function GameTitle() {

    return (
        <div>
            <h2>
                {setText('title')}
            </h2>
        </div>
    )
}

export default GameTitle;