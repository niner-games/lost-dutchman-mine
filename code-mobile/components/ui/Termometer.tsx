import React from "react";
import termometer from "../../images/ui/termometer.png"; 

function Termometer() {
 
    return (
        <div style={{
            position: 'relative',
        }}>
            <img 
                src={termometer}  
                alt="Termometer" 
                style={{
                    position: 'relative',
                    zIndex: 0,
                    top: '2.5%',
                    bottom: '2.5%',
                    left: '10%',
                    height: '95%',
                }}
            />

            {/* Dot at the bottom of termometer */}
            <div style={{
                position: 'absolute',
                width: '20px',
                background: '#ff0000',
                zIndex: 1,
                // TODO: it needs to be percentage calculated from dimensions in order to be responsive.
                bottom: '15px',
                left: '10px',
                height: '50px',
            }}></div>

            {/* Bar of termometer */}
            <div style={{
                position: 'absolute',
                width: '20px',
                background: '#ff0000',
                zIndex: 1,
                // TODO: it needs to be percentage calculated from dimensions in order to be responsive.
                bottom: '15px',
                left: '10px',
                height: '50px',
            }}></div>
        </div>
    )
}

export default Termometer;