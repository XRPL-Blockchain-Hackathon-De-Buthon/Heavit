import React from "react";
import imageI from "../bit/i.png";

const I: React.FC = () => {
  return (
    <div
      style={{
        width: "393px",
        height: "900px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <img
        src={imageI}
        alt="A"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
};

export default I;
