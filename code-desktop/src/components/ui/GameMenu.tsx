import React from "react";
import Termometer from "./Termometer";
import GameBoard from "./GameBoard";
import Clock from "./Clock";
import BottomMenuButtons from "./BottomMenuButtons";
import { InGameMenuProps } from "../../types/menu";

function GameMenu({ gameState, setOpened }: InGameMenuProps) {

    return (
        <div style={{ 
            position: 'fixed',
            bottom: 0,
            width: '100%',
            height: '40%',
            display: 'flex',
            // TODO: remove background once have image
            background: '#c08d49'
            // TODO: add background image
            // backgroundImage={} 
        }}>
            <Termometer /> 
            <div>
                <div style={{
                    display: 'flex',
                }}>
                    <GameBoard />
                    <Clock />
                </div>
                <div>
                    <BottomMenuButtons setOpened={setOpened} />
                </div>
            </div>
        </div>
    )
}

export default GameMenu;