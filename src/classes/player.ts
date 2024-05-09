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
import { ratio, dimensionsRatio } from "../utils/ratio";
import { heightModifier } from "../utils/modifiers";
import { bandBorder, moveScreenVerticalBorder } from "../utils/borders";

let lastTick = 0;
let lastAnimationPlayed = 0;

class Player extends Character {
  speed = 3;
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
  reachedLeftBorder = false;
  reachedRightBorder = false;
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

  setTop = (newTop: number) => {
    this.top = newTop;
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

  setReachedBorder = (leftBorder: boolean = true, toValue: boolean = true) => {
    if (leftBorder) {
      this.reachedLeftBorder = toValue;
    } else {
      this.reachedRightBorder = toValue;
    }
  };

  getX = () => this.x;
  getY = () => this.y;
  getLeft = () => this.left;
  getTop = () => this.top;
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
      left: this.getLeft(),
      top: this.getTop(),
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
    const dimensions = canvasHeight / dimensionsRatio;
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

  calculateNewPosition = (delta: number, dir: Directions) => {
    const staticHeight = document.documentElement.clientHeight * heightModifier;
    const canvasWidth = ratio * staticHeight;
    const seenPercentage = document.documentElement.clientWidth / canvasWidth;

    if (dir.name === "left") {
      if (this.left <= moveScreenVerticalBorder) {
        if (this.reachedLeftBorder) {
          return {
            field: "left",
            position: (this.left +=
              dir.vec.x * this.speed * delta * modifier * (1 / seenPercentage)),
          };
        } else {
          return {
            field: "x",
            position: (this.x += dir.vec.x * this.speed * delta * modifier),
          };
        }
      } else {
        return {
          field: "left",
          position: (this.left +=
            dir.vec.x * this.speed * delta * modifier * (1 / seenPercentage)),
        };
      }
    } else if (dir.name === "right") {
      if (this.left >= 1 - moveScreenVerticalBorder) {
        if (this.reachedRightBorder) {
          return {
            field: "left",
            position: (this.left +=
              dir.vec.x * this.speed * delta * modifier * (1 / seenPercentage)),
          };
        } else {
          return {
            field: "x",
            position: (this.x += dir.vec.x * this.speed * delta * modifier),
          };
        }
      } else {
        return {
          field: "left",
          position: (this.left +=
            dir.vec.x * this.speed * delta * modifier * (1 / seenPercentage)),
        };
      }
    }

    return { field: "none", position: 0 };
  };

  handleMouseMovement = (
    lastAnimation: number,
    tick: number,
    delta: number
  ) => {
    this.startWalkingSound();
    let dir = directions.NONE;
    if (this.direction === "left") {
      dir = directions.LEFT;
    }

    if (this.direction === "right") {
      dir = directions.RIGHT;
    }

    if (lastAnimation > animationSpeed) {
      if (
        animations[this.direction][this.currentAnimation].length - 1 >
        this.frame
      ) {
        this.frame += 1;
      } else {
        this.frame = 0;
      }

      lastAnimationPlayed = tick;
    }

    this.currentAnimation = "move";

    const newPosition = this.calculateNewPosition(delta, dir);

    const staticHeight = document.documentElement.clientHeight * heightModifier;
    const canvasWidth = ratio * staticHeight;
    const seenPercentage = document.documentElement.clientWidth / canvasWidth;
    const halfOfSeenPercentage = seenPercentage / 2;
    const startSeeingPoint = this.x - halfOfSeenPercentage;
    const toPointToLeft = this.toPoint - startSeeingPoint;
    const calculatedScreenToPosition = toPointToLeft / seenPercentage;
    const leftToX = this.left * seenPercentage;
    const actualXToPoint = this.toPoint + halfOfSeenPercentage - leftToX;
    const actualXToRightPoint = this.toPoint - (leftToX - halfOfSeenPercentage);

    let finished = false;
    if (this.direction === "left") {
      if (newPosition.field === "x") {
        if (actualXToPoint >= newPosition.position) {
          this.x = actualXToPoint;
          finished = true;
        }
      } else if (newPosition.field === "left") {
        if (calculatedScreenToPosition >= newPosition.position) {
          this.left = calculatedScreenToPosition;
          finished = true;
        }
      }
    }

    if (this.direction === "right") {
      if (newPosition.field === "x") {
        if (actualXToRightPoint <= newPosition.position) {
          this.x = actualXToRightPoint;
          finished = true;
        }
      } else if (newPosition.field === "left") {
        if (calculatedScreenToPosition <= newPosition.position) {
          this.left = calculatedScreenToPosition;
          finished = true;
        }
      }
    }

    if (finished) {
      this.frame = 0;
      this.currentAnimation = "idle";
      this.traveling = false;
    }

    if (this.traveling) {
      if (newPosition.field === "left") {
        this.left = newPosition.position;
      } else if (newPosition.field === "x") {
        this.x = newPosition.position;
      }
    }

    if (this.location === "town") {
      this.currentAnimation = "move";

      if (this.direction === "left" && this.left < bandBorder) {
        this.location = "map";
        this.x = 0.44;
        this.y = 0.5;
        this.left = 0.5;
        this.top = 0.5;
        this.currentAnimation = "idle";
        this.frame = 0;
        this.traveling = false;
      }

      if (this.direction === "right" && this.left > 1 - bandBorder) {
        this.location = "map";
        this.x = 0.44;
        this.y = 0.5;
        this.left = 0.5;
        this.top = 0.5;
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

    const newPosition = this.calculateNewPosition(delta, dir);

    if (newPosition.field === "left") {
      this.left = newPosition.position;
    } else if (newPosition.field === "x") {
      this.x = newPosition.position;
    }

    this.direction = dir.name;

    if (this.location === "town") {
      this.currentAnimation = "move";

      if (this.direction === "left" && this.left < bandBorder) {
        this.location = "map";
        this.x = 0.44;
        this.y = 0.5;
        this.top = 0.44;
        this.left = 0.5;
        this.currentAnimation = "idle";
      }

      if (this.direction === "right" && this.left > 1 - bandBorder) {
        this.location = "map";
        this.x = 0.44;
        this.y = 0.5;
        this.top = 0.44;
        this.left = 0.5;
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
      this.direction = e.clientX - width * this.left < 0 ? "left" : "right";
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
