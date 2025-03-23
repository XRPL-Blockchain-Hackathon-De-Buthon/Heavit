import React from "react";
import imageK from "../bit/k.png";

const K: React.FC = () => {
  return (
    <div
      style={{
        width: "393px",
        height: "852px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "#fff",
      }}
    >
      <img
        src={imageK}
        alt="A"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
};

export default K;
