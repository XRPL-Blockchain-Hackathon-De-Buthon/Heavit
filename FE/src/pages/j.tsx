import React from "react";
import imageJ from "../bit/j.png";

const J: React.FC = () => {
  return (
    <div
      style={{
        width: "393px",
        height: "852px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <img
        src={imageJ}
        alt="A"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
};

export default J;
