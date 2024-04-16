import React from "react";
import termometer from "../../images/ui/termometer.png";

function Termometer() {
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <img
        src={termometer}
        alt="Termometer"
        style={{
          position: "relative",
          zIndex: 0,
          top: "0%",
          bottom: "2.5%",
          left: "0%",
          height: "95%",
        }}
      />
      {/* Bar of termometer */}
      <div
        style={{
          position: "absolute",
          width: "12px",
          background: "#ef0000",
          zIndex: 1,
          // TODO: it needs to be percentage calculated from dimensions in order to be responsive.
          bottom: "57px",
          left: "29px",
          height: "35px",
          borderLeft: "4px solid #ae0000",
          borderRight: "4px solid #ae0000",
        }}
      ></div>
    </div>
  );
}

export default Termometer;
