
import idleDown from "../animations/player/down/idle.png";
import idleUp from "../animations/player/up/idle.png";
import idleLeft from "../animations/player/left/idle.png";
import idleRight from "../animations/player/right/idle.png";
import left001 from "../animations/player/left/001.png";
import left002 from "../animations/player/left/002.png";
import left003 from "../animations/player/left/003.png";
import left004 from "../animations/player/left/004.png";
import left005 from "../animations/player/left/005.png";
import left006 from "../animations/player/left/006.png";
import right001 from "../animations/player/right/001.png";
import right002 from "../animations/player/right/002.png";
import right003 from "../animations/player/right/003.png";
import right004 from "../animations/player/right/004.png";
import right005 from "../animations/player/right/005.png";
import right006 from "../animations/player/right/006.png";
import walk from "../sounds/walking.wav";
import { AnimationsEngine, WindowDimensions, Directions } from "../types/game";

let lastTick = 0; 
let lastAnimationPlayed = 0;
const animationSpeed = 150;
const modifier = 0.00001;
const directions = {
    NONE: {idx: 0, name: 'down', vec: {x: 0, y: 0}},
    RIGHT: {idx: 1, name: 'right', vec: {x: 1, y: 0}},
    LEFT: {idx: 2, name: 'left', vec: {x: -1, y: 0}},
}

const walkingSound = new Audio(walk);
walkingSound.loop = true;

const idle001Down = new Image();
idle001Down.src = idleDown;
const idle001Up = new Image();
idle001Up.src = idleUp;
const idle001Left = new Image();
idle001Left.src = idleLeft;
const left1 = new Image();
left1.src = left001;
const left2 = new Image();
left2.src = left002;
const left3 = new Image();
left3.src = left003;
const left4 = new Image();
left4.src = left004;
const left5 = new Image();
left5.src = left005;
const left6 = new Image();
left6.src = left006;
const idle001Right = new Image();
idle001Right.src = idleRight;
const right1 = new Image();
right1.src = right001;
const right2 = new Image();
right2.src = right002;
const right3 = new Image();
right3.src = right003;
const right4 = new Image();
right4.src = right004;
const right5 = new Image();
right5.src = right005;
const right6 = new Image();
right6.src = right006;

const animations: AnimationsEngine = {
    down: {
        idle: [idle001Down],
    },
    up: {
        idle: [idle001Up],
    },
    left: {
        idle: [idle001Left],
        move: [idle001Left, left1, left2, left3, left4, left5, left6],
    },
    right: {
        idle: [idle001Right],
        move: [idle001Right, right1, right2, right3, right4, right5, right6],
    }
}

class Player {
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
            const canvasHeight = windowDimensions.height * 0.6 - 20;
            const dimensions = canvasHeight / this.ratio;
            const imgHeight = dimensions;
            const imgWidth = dimensions * widthRatio;
            const height = (canvasHeight - imgHeight) * this.top;
            const width = windowDimensions.width * this.left - imgWidth / 2;
            context.drawImage(player, width, height, imgWidth, imgHeight);
        }
    };
    
    // Function to get what player should do on key presses
    moveHandler = (tick: number) => {
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
    mouseMoveHandler = (e: MouseEvent, width: number, canvasWidth: number) => {
        if (!this.paused) {
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
