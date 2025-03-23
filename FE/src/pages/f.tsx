import React from "react";
import { useNavigate } from "react-router-dom";
import imageF from "../bit/f.png";
import footerImage from "../bit/Footer.png";

const F: React.FC = () => {
  const navigate = useNavigate();

  const handleFooterClick = () => {
    navigate("/i");
  };

  return (
    <div
      style={{
        width: "393px",
        height: "852px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <img
        src={imageF}
        alt="A"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div onClick={handleFooterClick} style={{ cursor: "pointer" }}>
        <img
          src={footerImage}
          alt="Footer"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </div>
    </div>
  );
};

export default F;
