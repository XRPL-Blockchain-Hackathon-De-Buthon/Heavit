import React from "react";
import imageH from "../bit/h.png";

const H: React.FC = () => {
  return (
    <div
      style={{
        width: "393px",
        height: "1500px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <img
        src={imageH}
        alt="A"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
};

export default H;
