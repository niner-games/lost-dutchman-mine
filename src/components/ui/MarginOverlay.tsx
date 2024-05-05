import React, { CSSProperties, useCallback } from "react";

function MarginOverlay({ left = false }) {
  const styles = useCallback(() => {
    if (left) {
      return {
        zIndex: 1000,
        position: "absolute",
        left: 0,
        height: "100vh",
        width: "5vw",
        background: "#000",
      };
    }

    return {
      zIndex: 1000,
      position: "absolute",
      height: "100vh",
      right: 0,
      width: "5vw",
      background: "#000",
    };
  }, [left]);

  return <div style={styles() as CSSProperties}></div>;
}

export default MarginOverlay;
