import React from "react";
import { TextProps } from "../../types/menu";

function Subtitle({ text, classes = '' }: TextProps) {
    return <h4 className={classes}>{text}</h4>
}

export default Subtitle;