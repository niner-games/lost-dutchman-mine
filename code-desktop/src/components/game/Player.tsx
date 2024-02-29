import React from "react";
import idleDown from "../../animations/player/down/idle.png";

function Player() {

    return <img 
        src={idleDown} 
        alt={"Player"}
        style={{ 
            position: 'absolute', 
            transition: 'linear', 
            top: '80%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        }}
    />
}

export default Player;