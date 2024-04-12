import React from "react";
import clock from "../../images/ui/clock.png";

function CurrentTime() {

    return (
        <div style={{
            position: 'relative',
        }}>
            {/* HOURS */}
            <div style={{
                width: '10px',
                height: '30px',
                background: '#000',
                position: 'absolute'
            }}></div>
            {/* MINUTES */}
            <div style={{
                width: '10px',
                height: '60px',
                background: '#000',
                position: 'absolute'
            }}></div>

            <img src={clock} alt="Clock" style={{
                width: '120px',
            }} />
        </div>
    )
}

export default CurrentTime;