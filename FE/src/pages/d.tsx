import React from "react";
import imageD from "../bit/d.png";

const D: React.FC = () => {
  const handleClick = () => {
    window.history.pushState({}, "", "/c");
  };

  return (
    <div
      style={{
        width: "393px",
        height: "852px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "white",
      }}
      onClick={handleClick}
    >
      <img
        src={imageD}
        alt="A"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center -20%",
        }}
      />
    </div>
  );
};

export default D;
