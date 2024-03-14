import React, { useEffect } from "react";
import Subtitle from "../common/Subtitle";
import splash from "../../images/ui/cover.png";
import introSound from "../../sounds/intro.wav";
import { version } from "../../../package.json";
import { SplashScreenProps } from "../../types/menu";

function SplashScreen({ windowDimensions, opacity, setSplashScreen }: SplashScreenProps) {
    useEffect(() => {
        const handleKeyPress = () => {
            setSplashScreen(1.0);
        }

        document.addEventListener('keydown', handleKeyPress);
        document.addEventListener('mousedown', handleKeyPress);
        
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
            document.removeEventListener('mousedown', handleKeyPress);
        }
    }, [setSplashScreen]);

    return (
        <div>
            <img 
                src={splash} 
                alt="Background splash screen" 
                width={windowDimensions.width} 
                height={windowDimensions.height} 
                style={{ opacity, transition: 'linear' }}
            />

            <audio autoPlay loop src={introSound}></audio>
            <Subtitle text="Press any key to start" classes="white absolute bottom right z-index-1" />
            <Subtitle text={`Game version: ${version}`} classes="white absolute bottom left z-index-1" />
        </div>
    )
}

export default SplashScreen;
