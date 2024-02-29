import React from "react";
import { TextProps } from "../../types/menu";

function Title({ text, classes = '' }: TextProps) {
    return <h2 className={classes}>{text}</h2>
}

export default Title;