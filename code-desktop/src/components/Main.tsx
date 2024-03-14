import React, { useState, useEffect, useCallback } from "react";
import { v4 } from "uuid";
import Menu from "./ui/Menu";
import PauseScreen from "./ui/PauseScreen";
import Game from "./game/Game";
import SplashScreen from "./ui/SplashScreen";
import { setText } from "../context/language";
import { SavedGame } from "../types/game";

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
        uuid: v4(),
        saveName: '',
        location: 'town',
        backgroundAlt: setText('bgTown'),
        playerPosition: {
            x: 0.5,
            y: 0.47,
            direction: 'down',
            currentAnimation: 'idle',
            frame: 0,
        }
    });
    const [language, setLanguage] = useState(window.localStorage.getItem('language') || 'en');
    const [error, setError] = useState('');

    const saveGame = useCallback((gameName: string) => {
        const gamesToLoad: string | undefined = window.localStorage.getItem('saved-games');

        if (gamesToLoad) {
            try {
                let games: SavedGame[] = JSON.parse(gamesToLoad);
                let alreadySaved = false;
                games = games.map(game => {
                    if (game.uuid !== gameState.uuid) return game;
                    else {
                        alreadySaved = true;
                        setGameState({ ...gameState, saveName: gameName});
                        return { ...gameState, saveName: gameName};
                    }
                })

                if (!alreadySaved) {
                    games.push({ ...gameState, saveName: gameName})
                    setGameState({ ...gameState, saveName: gameName});
                }

                const stringifiedGames = JSON.stringify(games);
                window.localStorage.setItem('saved-games', stringifiedGames);
            } catch(e) {
                setError(setText('couldNotSave'));
            }
        } else {
            window.localStorage.setItem('saved-games', JSON.stringify([{ ...gameState, saveName: gameName }]));
        }
    }, [gameState, setGameState, setError]);

    const loadGame = useCallback((uuid: string) => {
        const gamesToLoad: string | undefined = window.localStorage.getItem('saved-games');
        if (!gamesToLoad) {
            setError(setText('couldNotLoad'));
            return;
        }

        try {
            const games: SavedGame[] = JSON.parse(gamesToLoad);

            games.forEach((game) => {
                if (game.uuid === uuid) {
                    setGameState(game);
                    setScreen('game');
                }
            })
        } catch(e) {
            setError(setText('fileCorrupted'));
            return;
        }
    }, [gameState, setScreen, setError]);

    const setSplashInterval = useCallback(() => {
        setInterval(() => {
            const now = new Date().getTime();
            const delta = now - lastUpdate;
            const deltaModifier = delta / 100
            setLastUpdate(now);
            setSplashScreenOpacity(splashScreenOpacity + (0.01 * deltaModifier));
        }, 20);
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
        return () => {
            window.removeEventListener('resize', handleResize)
        };
    });

    useEffect(() => {
        if (splashScreenOpacity >= 1) {
            const interval_id = setInterval(function(){}, Number.MAX_SAFE_INTEGER);

            for (let i = 1; i < Number(interval_id); i += 1) {
                clearInterval(i);
            }
        }
    }, [splashScreenOpacity]);

    useEffect(() => {
        document.title = setText('title');
    }, [language])

    if (splashScreenOpacity < 1) {
        return <SplashScreen windowDimensions={windowDimensions} opacity={splashScreenOpacity} setSplashScreen={setSplashScreenOpacity} />;
    }

    if (screen === 'game') {
        return <Game savedGame={gameState} saveGame={saveGame} setGameState={setGameState} windowDimensions={windowDimensions} loadGame={loadGame} />;
    }

    if (screen === 'load') {
        return <PauseScreen inMenu={true} setOpened={setScreen} loadGame={loadGame} />;
    }

    return <Menu loadGame={loadGame} setScreen={setScreen} language={language} setLanguage={setLanguage} />;
}

export default Main;