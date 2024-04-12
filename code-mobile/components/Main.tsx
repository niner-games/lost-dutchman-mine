import React, { useState, useEffect, useCallback } from "react";
import { v4 } from "uuid";
import Menu from "./ui/Menu";
import PauseScreen from "./ui/PauseScreen";
import Game from "./game/Game";
import SplashScreen from "./ui/SplashScreen";
import player from "../services/player";
import { setText } from "../context/language";
import { getWindowDimensions } from "../utils/window";
import { SavedGame } from "../types/game";

// Holder for resize window timeout
let timeoutId: NodeJS.Timeout = null;
let lastTick = 0;
let opacity = 0.2;

function Main() {
    const [isOwnOpacity, setIsOwnOpacity] = useState(false);
    // Variable for rerendering while opacity changes.
    const [lastUpdate, setLastUpdate] = useState(new Date().getTime());
    // Variable to store window dimensions and adjust what we see accordingly
    const [windowDimensions, setWindowDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth,
    });
    // Variable to store current screen
    const [screen, setScreen] = useState('splash');
    // Variable to store game state (aca game save)
    const [gameState, setGameState] = useState({
        uuid: v4(),
        saveName: '',
        location: 'town',
        backgroundAlt: 'bgTown',
        playerPosition: {
            x: player.getX(),
            y: player.getY()
        }
    });
    // Variable to store language
    const [language, setLanguage] = useState(window.localStorage.getItem('language') || 'en');
    // Variable to store error messages
    const [error, setError] = useState('');

    // Function to save game
    const saveGame = useCallback((gameName: string) => {
        // Get saved games from local storage
        const gamesToLoad: string | undefined = window.localStorage.getItem('saved-games');

        // If there are saved games, parse them and add new game to the list or save over existing game
        if (gamesToLoad) {
            try {
                let games: SavedGame[] = JSON.parse(gamesToLoad);
                let alreadySaved = false;
                games = games.map(game => {
                    if (game.uuid !== gameState.uuid) return game;
                    else {
                        alreadySaved = true;
                        setGameState({ ...gameState, saveName: gameName, playerPosition: player.getPosition()});
                        return { ...gameState, saveName: gameName, playerPosition: player.getPosition()};
                    }
                })

                if (!alreadySaved) {
                    games.push({ ...gameState, saveName: gameName, playerPosition: player.getPosition()})
                    setGameState({ ...gameState, saveName: gameName, playerPosition: player.getPosition()});
                }

                const stringifiedGames = JSON.stringify(games);
                window.localStorage.setItem('saved-games', stringifiedGames);
            } catch(e) {
                setError('couldNotSave');
            }
        } else {
            // If there are no saved games, create new array and add new game to it
            window.localStorage.setItem('saved-games', JSON.stringify([{ ...gameState, saveName: gameName, playerPosition: player.getPosition() }]));
        }
    }, [gameState, setGameState, setError]);

    // Function to load game
    const loadGame = useCallback((uuid: string) => {
        // Get saved games from local storage
        const gamesToLoad: string | undefined = window.localStorage.getItem('saved-games');

        // If there are no saved games, show error message
        if (!gamesToLoad) {
            setError('couldNotLoad');
            return;
        }

        try {
            // If there are saved games, parse them and find the one we want to load
            const games: SavedGame[] = JSON.parse(gamesToLoad);

            games.forEach((game) => {
                // Load game into variable and set screen to game.
                if (game.uuid === uuid) {
                    player.setX(game.playerPosition.x);
                    player.setY(game.playerPosition.y);
                    setGameState(game);
                    setScreen('game');
                }
            })
        } catch(e) {
            setError('fileCorrupted');
            return;
        }
    }, [gameState, setScreen, setError]);

    const setSplashScreenOpacity = useCallback((to: number) => {
        if (to > 1) to = 1;
        if (to < 0) to = 0;
        opacity = to;
    }, []);

    const animationFrame = useCallback((tick: number) => {
        if (screen !== 'splash') return;
        if (isOwnOpacity) return;
        if (lastTick === 0) lastTick = tick;
        const delta = tick - lastTick;
        lastTick = tick;
        setSplashScreenOpacity(opacity + (0.03 * delta / 100));
        setLastUpdate(new Date().getTime());

        if (opacity < 1 && !isOwnOpacity) {
            requestAnimationFrame(animationFrame);
        }
    }, [isOwnOpacity]);

    // Function to animate splash screen
    const setSplashAnimationLoop = useCallback(() => {
        requestAnimationFrame(animationFrame);
    }, [isOwnOpacity]);

    useEffect(() => {
        setSplashAnimationLoop();
      
        function handleResize() {
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }

            // Only update window dimensions after 10ms of no resize events so we don't rerender it too often
            const id = setTimeout(() => {
                setWindowDimensions(getWindowDimensions());
            }, 20);
            
            timeoutId = id;
        }
      
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isOwnOpacity]);

    useEffect(() => {
        // Set document title based on language
        document.title = 'Lost Dutchman Mine';
    }, [language])

    if (screen === 'splash') {
        return <SplashScreen 
            windowDimensions={windowDimensions} 
            opacity={opacity} 
            setOpacity={setSplashScreenOpacity} 
            setScreen={setScreen} 
            setLastUpdate={setLastUpdate}
            isOwnOpacity={isOwnOpacity}
            setIsOwnOpacity={setIsOwnOpacity}
            lastUpdate={lastUpdate}
        />;
    }

    if (screen === 'game') {
        return <Game savedGame={gameState} saveGame={saveGame} setGameState={setGameState} windowDimensions={windowDimensions} loadGame={loadGame} />;
    }

    if (screen === 'load') {
        return <PauseScreen inMenu={true} setOpened={setScreen} loadGame={loadGame} />;
    }

    return <Menu setScreen={setScreen} language={language} setLanguage={setLanguage} />;
}

export default Main;