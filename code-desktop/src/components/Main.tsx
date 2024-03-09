import React, { useState, useEffect, useCallback } from "react";
import Menu from "./ui/Menu";
import Game from "./game/Game";
import splash from "../images/ui/cover.jpg";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
}

let timeoutId: NodeJS.Timeout = null;

function Main() {
    const [splashScreenOpacity, setSplashScreenOpacity] = useState(0.5);
    const [lastUpdate, setLastUpdate] = useState(new Date().getTime());
    const [windowDimensions, setWindowDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth,
    });
    const [screen, setScreen] = useState('menu');
    const [gameState, setGameState] = useState({
        location: 'town',
        backgroundAlt: 'Town background',
        playerPosition: {
            x: 0.5,
            y: 0,
            direction: 'down',
            currentAnimation: 'idle',
            frame: 0,
        }
    });
    const [language, setLanguage] = useState('en');

    const loadGame = useCallback(() => {

    }, []);

    const setSplashInterval = useCallback(() => {
        setInterval(() => {
            const now = new Date().getTime();
            const delta = now - lastUpdate;
            const deltaModifier = delta / 100
            setLastUpdate(now);
            setSplashScreenOpacity(splashScreenOpacity + (0.02 * deltaModifier));
        }, 20)
    }, [])

    useEffect(() => {
        setSplashInterval();
      
        function handleResize() {
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }

            const id = setTimeout(() => {
                setWindowDimensions(getWindowDimensions());
            }, 10);
            
            timeoutId = id;
        }
      
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    });

    useEffect(() => {
        if (splashScreenOpacity >= 1) {
            const interval_id = setInterval(function(){}, Number.MAX_SAFE_INTEGER);

            for (let i = 1; i < Number(interval_id); i += 1) {
                clearInterval(i);
            }
        }
    }, [splashScreenOpacity])

    if (splashScreenOpacity < 1) {
        return (
            <img 
                src={splash} 
                alt="Background splash screen" 
                width={windowDimensions.width} 
                height={windowDimensions.height} 
                style={{ opacity: splashScreenOpacity, transition: 'linear' }}
            />
        )
    }

    if (screen === 'game') {
        return <Game savedGame={gameState} setGameState={setGameState} windowDimensions={windowDimensions} />;
    }

    return <Menu loadGame={loadGame} setScreen={setScreen} language={language} setLanguage={setLanguage} />;
}

export default Main;