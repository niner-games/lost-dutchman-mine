import React from "react";
import { MenuButtonProps } from "../../types/menu";

function MenuButton({ clickHandler, text, classes = "" }: MenuButtonProps) {
  return (
    <button className={classes} onClick={clickHandler}>
      {text}
    </button>
  );
}

export default MenuButton;
