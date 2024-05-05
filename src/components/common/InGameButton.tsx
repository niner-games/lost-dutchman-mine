import React, { useMemo } from "react";
import { DownMenuButtonProps } from "../../types/menu";
import { InGameButtonStyles } from "../../types/styles";

function InGameButton({
  backgroundImage: backgroundImg,
  image,
  text,
  callback = () => {},
  valueToPass,
}: DownMenuButtonProps) {
  const styles = useMemo(() => {
    const styleToSave: InGameButtonStyles = {
      cursor: "pointer",
      width: "5vw",
      height: "5vw",
      filter: "drop-shadow(rgb(0, 0, 0) 5px 5px 2px)",
    };

    if (backgroundImg) {
      styleToSave.backgroundImage = `url(${backgroundImg})`;
      styleToSave.backgroundPosition = "center";
      styleToSave.backgroundRepeat = "no-repeat";
      styleToSave.backgroundSize = "cover";
    }

    return styleToSave;
  }, [backgroundImg]);

  return (
    <button
      style={styles}
      onClick={() => {
        if (valueToPass) {
          callback(valueToPass);
        } else {
          callback();
        }
      }}
    >
      {image ? (
        <img
          style={{
            width: "100%",
          }}
          src={image}
          alt="Button"
        />
      ) : null}
      {text}
    </button>
  );
}

export default InGameButton;
