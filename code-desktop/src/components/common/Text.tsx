import React from "react";
import { TextProps } from "../../types/menu";

function Text({ text, classes = "" }: TextProps) {
  return <p className={classes}>{text}</p>;
}

export default Text;
