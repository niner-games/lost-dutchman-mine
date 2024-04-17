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
            width: "50px",
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
