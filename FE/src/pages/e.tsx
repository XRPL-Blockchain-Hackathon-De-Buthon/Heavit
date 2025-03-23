import React from "react";
import { Link } from "react-router-dom";
import imageE from "../bit/CarLoan.png";

const E: React.FC = () => {
  return (
    <Link to="/h" style={{ textDecoration: "none" }}>
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
          src={imageE}
          alt="A"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </Link>
  );
};

export default E;
