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
          width: "8%",
          background: "#ef0000",
          zIndex: 1,
          bottom: "13.5%",
          left: "18%",
          height: "35px",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          width: "2.5384615384615384615384612%",
          background: "#ae0000",
          zIndex: 2,
          bottom: "13.5%",
          left: "15.6%",
          height: "35px",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          width: "2.9615384615384615384615384615385%",
          background: "#ae0000",
          zIndex: 2,
          bottom: "13.5%",
          left: "24.2%",
          height: "35px",
        }}
      ></div>
    </div>
  );
}

export default Termometer;
