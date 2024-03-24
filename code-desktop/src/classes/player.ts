import Character from "./character";
import { animations, animationSpeed, modifier, directions } from "../services/animations";
import { walkingSound } from "../services/sounds";
import { WindowDimensions, Directions } from "../types/game";

let lastTick = 0; 
let lastAnimationPlayed = 0;

class Player extends Character {
    speed = 3;
    backgroundSpeed = 1.0;
    ratio = 3.0;
    x = 0.5;
    y = 0.5;
    top = 0.9;
    left = 0.5;
    direction = 'down';
    currentAnimation = 'idle';
    frame = 0;
    walkingSoundPlaying = false;
    traveling = false;
    toPoint = this.x;
    paused = false;
    keyPressed: string = null;

    constructor() {
        super();

        this.start();
        requestAnimationFrame(this.update);
    }

    setKeyPressed = (key: string) => {
        this.keyPressed = key;
    };
    
    setX = (newX: number) => {
        this.x = newX;
    }
    
    setY = (newY: number) => {
        this.y = newY;
    }
    
    setTop = (newTop: number) => {
        this.top = newTop;
    }
    
    setLeft = (newLeft: number) => {
        this.left = newLeft;
    }
    
    setDirection = (newDirection: string) => {
        this.direction = newDirection;
    }
    
    setCurrentAnimation = (newCurrentAnimation: string) => {
        this.currentAnimation = newCurrentAnimation;
    }
    
    setFrame = (newFrame: number) => {
        this.frame = newFrame;
    }
    
    getX = () => this.x;
    getY = () => this.y;
    getTop = () => this.top;
    getLeft = () => this.left;
    getDirection = () => this.direction;
    getCurrentAnimation = () => this.currentAnimation;
    getFrame = () => this.frame;

    getPosition = () => {
        return {
            x: this.getX(),
            y: this.getY(),
        }
    };

    startWalkingSound = () => {
        if (!this.walkingSoundPlaying && !this.paused) {
            walkingSound.play();
        }
    };

    stopWalkingSound = () => {
        this.walkingSoundPlaying = false;
        walkingSound.pause();
    };

    drawPlayer = (context: any, windowDimensions: WindowDimensions) => {
        if(!this.paused) {
            const player = animations[this.direction][this.currentAnimation][this.frame];
            const widthRatio = player.width / player.height;
            const canvasHeight = windowDimensions.height * 0.5138888888888889;
            const dimensions = canvasHeight / this.ratio;
            const imgHeight = dimensions;
            const imgWidth = dimensions * widthRatio;
            const height = (canvasHeight - imgHeight) * this.top;
            const width = windowDimensions.width * this.left - imgWidth / 2;
            context.drawImage(player, width, height, imgWidth, imgHeight);
        }
    };
    
    // Function to get what player should do on key presses
    update = (tick: number) => {
        if (!this.paused) {
            const delta = tick - lastTick;
            const lastAnimation = tick - lastAnimationPlayed;
            lastTick = tick;
            let dir = directions.NONE;
            if (this.keyPressed === 'ArrowLeft') { 
                dir = directions.LEFT;
            }
    
            if (this.keyPressed === 'ArrowRight') { 
                dir = directions.RIGHT; 
            }
    
            if (this.keyPressed === 'ArrowRight' || this.keyPressed === 'ArrowLeft') {
                this.handleArrowMovement(delta, dir, tick, lastAnimation);
            } else {
                if (this.traveling) {
                    this.handleMouseMovement(lastAnimation, tick, delta);
                } else {
                    this.stopWalkingSound();
                    this.currentAnimation = 'idle';
                    this.frame = 0;
                }
            }
        }

        requestAnimationFrame(this.update);
    };

    handleMouseMovement = (lastAnimation: number, tick: number, delta: number) => {
        this.startWalkingSound();

        if (lastAnimation > animationSpeed) {
            if (this.direction === (this.toPoint < this.x ? 'left' : this.toPoint > this.x ? 'right' : 'down')) {
                if (animations[this.direction][this.currentAnimation].length - 1 > this.frame) {
                    this.frame += 1;
                } else {
                    this.frame = 0;
                }
            } else {
                this.frame = 0;
            }

            lastAnimationPlayed = tick;
        }

        this.currentAnimation = 'move';
        const newPosition =  this.x + (this.toPoint < this.x ? -1 : 1) * this.speed * delta * modifier;
        
        if (this.direction === 'left' && this.toPoint >= newPosition) {
            this.x = this.toPoint;
            this.frame = 0;
            this.currentAnimation = 'idle';
            this.traveling = false;
        }

        if (this.direction === 'right' && this.toPoint <= newPosition) {
            this.x = this.toPoint;
            this.frame = 0;
            this.currentAnimation = 'idle';
            this.traveling = false;
        }

        this.x += (this.toPoint < this.x ? -1 : 1) * this.speed * delta * modifier;
    };

    handleArrowMovement = (delta: number, dir: Directions, tick: number, lastAnimation: number) => {
        this.startWalkingSound();
        this.traveling = false;
        this.toPoint = this.x;
        if (lastAnimation > animationSpeed) {
            if (this.direction === dir.name) {
                if (animations[this.direction][this.currentAnimation].length - 1 > this.frame) {
                    this.frame += 1;
                } else {
                    this.frame = 0;
                }
            } else {
                this.frame = 0;
            }

            lastAnimationPlayed = tick;
        }
        this.currentAnimation = 'move';

        this.x += dir.vec.x * this.speed * delta * modifier;
        
        this.direction = dir.name;
    };
    
    // Function to get what player should do on mouse click
    mouseMoveHandler = (e: any, width: number, canvasWidth: number) => {
        if (!this.paused && e.target.id === 'game-canvas') {
            const screenAt = canvasWidth * this.x;
            const center = width / 2;
            const playerPoint = (screenAt + e.clientX - center) / canvasWidth;
            this.traveling = true;
            this.toPoint = playerPoint;
            this.direction = e.clientX - center < 0 ? 'left' : 'right';
        }
    };

    startPause = () => {
        this.paused = true;
        this.traveling = false;
        this.toPoint = this.x;
        this.stopWalkingSound();
    };

    stopPause = () => { 
        this.paused = false;
    };
}

export default Player;
