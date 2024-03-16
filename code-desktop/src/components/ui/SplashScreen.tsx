import React, { useEffect } from "react";
import Subtitle from "../common/Subtitle";
import splash from "../../images/ui/cover.png";
import introSound from "../../sounds/intro.wav";
import { version } from "../../../package.json";
import { SplashScreenProps } from "../../types/menu";

function SplashScreen({ windowDimensions, opacity, setScreen }: SplashScreenProps) {
    useEffect(() => {
        // On any press even, change splash screen to menu
        const handleKeyPress = () => {
            setScreen('menu');
        }

        document.addEventListener('keydown', handleKeyPress);
        document.addEventListener('mousedown', handleKeyPress);
        
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
            document.removeEventListener('mousedown', handleKeyPress);
        }
    }, [setScreen]);

    return (
        <div>
            <img 
                src={splash} 
                alt="Background splash screen" 
                width={windowDimensions.width} 
                height={windowDimensions.height} 
                style={{ opacity, transition: 'linear' }}
            />

            <audio autoPlay src={introSound} onEnded={() => setScreen('menu')}></audio>
            <Subtitle text="Press any key to start" classes="white absolute bottom right z-index-1" />
            <Subtitle text={`Game version: ${version}`} classes="white absolute bottom left z-index-1" />
        </div>
    )
}

export default SplashScreen;
