import React from "react";
import InGameButton from "../common/InGameButton";
import btn1 from "../../images/ui/btn1.png";
import btn2 from "../../images/ui/btn2.png";
import btn3 from "../../images/ui/btn3.png";
import btn4 from "../../images/ui/btn4.png";
import btn5 from "../../images/ui/btn5.png";
import btn6 from "../../images/ui/btn6.png";
import coin from "../../images/ui/coin.png";
import player from "../../images/ui/player_icon.png";
import pan from "../../images/ui/pan.png";
import pickaxe from "../../images/ui/pickaxe_and_shovel2.png";
import gun from "../../images/ui/gun.png";
import joystick from "../../images/ui/joystick.png";
import { BottomMenuButtonsProps } from "../../types/menu";

function BottomMenuButtons({ setOpened }: BottomMenuButtonsProps) {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <InGameButton backgroundImage={btn1} image={coin} />
      <InGameButton backgroundImage={btn2} image={player} />
      <InGameButton backgroundImage={btn3} image={pan} />
      <InGameButton backgroundImage={btn4} image={pickaxe} />
      <InGameButton backgroundImage={btn5} image={gun} />
      <InGameButton
        backgroundImage={btn6}
        image={joystick}
        callback={setOpened}
        valueToPass="pause"
      />
    </div>
  );
}

export default BottomMenuButtons;
