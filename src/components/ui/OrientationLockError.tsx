import React, { useEffect, useState } from "react";
import Title from "../common/Title";
import Subtitle from "../common/Subtitle";
import Text from "../common/Text";
import { setText } from "../../context/language";
import { getWindowDimensions } from "../../utils/window";

function OrientationLockError() {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    function displayOverlay() {
      const { width, height } = getWindowDimensions();

      if (width > height) {
        setShowOverlay(false);
      } else {
        setShowOverlay(true);
      }
    }
    displayOverlay();

    window.addEventListener("resize", displayOverlay);

    return () => {
      window.removeEventListener("resize", displayOverlay);
    };
  }, []);

  if (!showOverlay) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        zIndex: 100000,
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.777)",
      }}
    >
      <Title
        text={
          setText("other", "Our game looks TERRIBLE in portrait orientation!")
            .text
        }
        classes={
          setText("other", "Our game looks TERRIBLE in portrait orientation!")
            .additionalClass
        }
      />
      <Subtitle
        text={
          setText(
            "other",
            "Please, rotate your device to landscape orientation in order to continue..."
          ).text
        }
        classes={
          setText(
            "other",
            "Please, rotate your device to landscape orientation in order to continue..."
          ).additionalClass
        }
      />
      <Text
        text={setText("other", "Thank you!").text}
        classes={setText("other", "Thank you!").additionalClass}
      />
    </div>
  );
}

export default OrientationLockError;
