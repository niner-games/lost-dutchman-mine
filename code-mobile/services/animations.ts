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
import { AnimationsEngine } from "../types/game";

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

export const animations: AnimationsEngine = {
    down: {
        idle: [idle001Down],
    },
    up: {
        idle: [idle001Up],
    },
    left: {
        idle: [idle001Left],
        move: [left1, left2, left3, left4, left5, left6],
    },
    right: {
        idle: [idle001Right],
        move: [right1, right2, right3, right4, right5, right6],
    }
}

export const animationSpeed = 150;
export const modifier = 0.00001;
export const directions = {
    NONE: {idx: 0, name: 'down', vec: {x: 0, y: 0}},
    RIGHT: {idx: 1, name: 'right', vec: {x: 1, y: 0}},
    LEFT: {idx: 2, name: 'left', vec: {x: -1, y: 0}},
}