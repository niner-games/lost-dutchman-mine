import React from "react";
import { TextProps } from "../../types/menu";

function Title({ text, classes = '' }: TextProps) {
    return <h1 className={classes}>{text}</h1>
}

export default Title;