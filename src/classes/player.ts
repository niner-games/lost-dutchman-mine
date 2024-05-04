import Character from "./character";
import {
  animations,
  animationSpeed,
  modifier,
  directions,
} from "../services/animations";
import { walkingSound } from "../services/sounds";
import { WindowDimensions, Directions } from "../types/game";
import { Item } from "../types/items";

let lastTick = 0;
let lastAnimationPlayed = 0;
const bandBorder = 0.01;
const heightModifier = 0.5138888888888889;

class Player extends Character {
  speed = 3;
  backgroundSpeed = 1.0;
  ratio = 3.0;
  x = 0.5;
  y = 0.9;
  top = 0.9;
  left = 0.5;
  direction = "down";
  currentAnimation = "idle";
  frame = 0;
  walkingSoundPlaying = false;
  traveling = false;
  toPoint = this.x;
  paused = false;
  location = "town";
  foodInventory: Array<Array<Item | null>> = [
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
  ];
  toolInventory: Array<Array<Item | null>> = [
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
  ];
  keyPressed: string | null = null;

  constructor() {
    super();

    this.start();
    requestAnimationFrame(this.update);
  }

  setKeyPressed = (key: string | null) => {
    this.keyPressed = key;
  };

  setX = (newX: number) => {
    this.x = newX;
  };

  setY = (newY: number) => {
    this.y = newY;
  };

  setLeft = (newLeft: number) => {
    this.left = newLeft;
  };

  setDirection = (newDirection: string) => {
    this.direction = newDirection;
  };

  setCurrentAnimation = (newCurrentAnimation: string) => {
    this.currentAnimation = newCurrentAnimation;
  };

  setFrame = (newFrame: number) => {
    this.frame = newFrame;
  };

  setPlayerLocation = (newLocation: string) => {
    this.location = newLocation;
  };

  setFoodInventory = (newFoodInventory: Array<Array<Item | null>>) => {
    this.foodInventory = newFoodInventory;
  };

  setToolInventory = (newToolInventory: Array<Array<Item | null>>) => {
    this.toolInventory = newToolInventory;
  };

  getX = () => this.x;
  getY = () => this.y;
  getLeft = () => this.left;
  getDirection = () => this.direction;
  getCurrentAnimation = () => this.currentAnimation;
  getFrame = () => this.frame;
  getPlayerLocation = () => this.location;
  getFoodInventory = () => this.foodInventory;
  getToolInventory = () => this.toolInventory;

  getPosition = () => {
    return {
      x: this.getX(),
      y: this.getY(),
    };
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
    if (this.paused) {
      return;
    }

    if (this.location === "map") {
      context.fillStyle = "#000";
      context.fillRect(
        windowDimensions.width * this.left - 20 / 2,
        (windowDimensions.height * heightModifier - 20) * this.y,
        20,
        20
      );
      return;
    }

    const player =
      animations[this.direction][this.currentAnimation][this.frame];
    if (!player) {
      return;
    }
    const widthRatio = player.width / player.height;
    const canvasHeight = windowDimensions.height * heightModifier;
    const dimensions = canvasHeight / this.ratio;
    const imgHeight = dimensions;
    const imgWidth = dimensions * widthRatio;
    const height = (canvasHeight - imgHeight) * this.y;
    const width = windowDimensions.width * this.left - imgWidth / 2;

    context.drawImage(player, width, height, imgWidth, imgHeight);
  };

  // Function to get what player should do on key presses
  update = (tick: number) => {
    if (!this.paused) {
      const delta = tick - lastTick;
      const lastAnimation = tick - lastAnimationPlayed;
      lastTick = tick;
      let dir = directions.NONE;
      if (this.keyPressed === "ArrowLeft" || this.keyPressed === "a") {
        dir = directions.LEFT;
      }

      if (this.keyPressed === "ArrowRight" || this.keyPressed === "d") {
        dir = directions.RIGHT;
      }

      if (
        this.keyPressed === "ArrowRight" ||
        this.keyPressed === "ArrowLeft" ||
        this.keyPressed === "a" ||
        this.keyPressed === "d"
      ) {
        this.handleArrowMovement(delta, dir, tick, lastAnimation);
      } else {
        if (this.traveling) {
          this.handleMouseMovement(lastAnimation, tick, delta);
        } else {
          this.stopWalkingSound();
          this.currentAnimation = "idle";
          this.frame = 0;
        }
      }
    }

    requestAnimationFrame(this.update);
  };

  handleMouseMovement = (
    lastAnimation: number,
    tick: number,
    delta: number
  ) => {
    this.startWalkingSound();

    if (lastAnimation > animationSpeed) {
      if (
        this.direction ===
        (this.toPoint < this.x
          ? "left"
          : this.toPoint > this.x
          ? "right"
          : "down")
      ) {
        if (
          animations[this.direction][this.currentAnimation].length - 1 >
          this.frame
        ) {
          this.frame += 1;
        } else {
          this.frame = 0;
        }
      } else {
        this.frame = 0;
      }

      lastAnimationPlayed = tick;
    }

    this.currentAnimation = "move";
    const newPosition =
      this.x + (this.toPoint < this.x ? -1 : 1) * this.speed * delta * modifier;

    if (this.direction === "left" && this.toPoint >= newPosition) {
      this.x = this.toPoint;
      this.frame = 0;
      this.currentAnimation = "idle";
      this.traveling = false;
    }

    if (this.direction === "right" && this.toPoint <= newPosition) {
      this.x = this.toPoint;
      this.frame = 0;
      this.currentAnimation = "idle";
      this.traveling = false;
    }

    this.x += (this.toPoint < this.x ? -1 : 1) * this.speed * delta * modifier;

    if (this.location === "town") {
      this.currentAnimation = "move";
      if (this.direction === "left" && this.x < 0 + bandBorder) {
        this.location = "map";
        this.x = 0.44;
        this.y = 0.5;
        this.currentAnimation = "idle";
        this.frame = 0;
        this.traveling = false;
      }

      if (this.direction === "right" && this.x > 1 - bandBorder) {
        this.location = "map";
        this.x = 0.44;
        this.y = 0.5;
        this.currentAnimation = "idle";
        this.frame = 0;
        this.traveling = false;
      }
    } else if (this.location === "map") {
      this.currentAnimation = "idle";
    }
  };

  handleArrowMovement = (
    delta: number,
    dir: Directions,
    tick: number,
    lastAnimation: number
  ) => {
    this.startWalkingSound();
    this.traveling = false;
    this.toPoint = this.x;
    if (lastAnimation > animationSpeed) {
      if (this.direction === dir.name) {
        if (
          animations[this.direction][this.currentAnimation].length - 1 >
          this.frame
        ) {
          this.frame += 1;
        } else {
          this.frame = 0;
        }
      } else {
        this.frame = 0;
      }

      lastAnimationPlayed = tick;
    }

    this.x += dir.vec.x * this.speed * delta * modifier;

    this.direction = dir.name;

    if (this.location === "town") {
      this.currentAnimation = "move";
      if (this.direction === "left" && this.x < 0 + bandBorder) {
        this.location = "map";
        this.x = 0.44;
        this.y = 0.5;
        this.currentAnimation = "idle";
      }

      if (this.direction === "right" && this.x > 1 - bandBorder) {
        this.location = "map";
        this.x = 0.44;
        this.y = 0.5;
        this.currentAnimation = "idle";
      }
    } else if (this.location === "map") {
      this.currentAnimation = "idle";
    }
  };

  // Function to get what player should do on mouse click
  mouseMoveHandler = (e: any, width: number, canvasWidth: number) => {
    if (!this.paused && e.target.id === "game-canvas") {
      const screenAt = canvasWidth * this.x;
      const center = width / 2;
      const playerPoint = (screenAt + e.clientX - center) / canvasWidth;
      this.traveling = true;
      this.toPoint = playerPoint;
      this.direction = e.clientX - center < 0 ? "left" : "right";
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
