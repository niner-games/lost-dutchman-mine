import React from "react";
import GameTitle from "./GameTitle";
import pickaxeAndShover from "../../images/ui/pickaxe_and_shovel1.png";
import board from "../../images/ui/down_board.png";

function GameBoard() {

    return (
        <div style={{
            display: 'flex',
            backgroundImage: `url(${board})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        }}>
            <div>
                <img src={pickaxeAndShover} alt="Pickaxe and shovel" className="board-pickaxe" />
            </div>
            <div>
                <GameTitle />
            </div>
            <div>
                <img src={pickaxeAndShover} alt="Pickaxe and shovel" className="board-pickaxe" />
            </div>
        </div>
    )
}

export default GameBoard;