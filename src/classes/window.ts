import { WindowDimensions } from "../types/game";

class WindowController {
  width = document.documentElement.clientWidth;
  height = document.documentElement.clientHeight;
  oldWidth = document.documentElement.clientWidth;
  oldHeight = document.documentElement.clientHeight;
  justChanged = false;

  setNewWindowDimensions = (dims: WindowDimensions) => {
    this.oldWidth = this.width;
    this.oldHeight = this.height;

    this.width = dims.width;
    this.height = dims.height;

    this.justChanged = true;
  };
}

export default WindowController;
