import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import background from "../bit/dbs.png";
import buttonImage from "../bit/scan.png";
import qrImage from "../bit/qr.png";

const App: React.FC = () => {
  const [showQR, setShowQR] = useState(false);
  const [animateQR, setAnimateQR] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (showQR) {
      setTimeout(() => setAnimateQR(true), 50);
    }
  }, [showQR]);

  const handleBackgroundClick = () => {
    if (showQR) {
      setAnimateQR(false);
      setTimeout(() => setShowQR(false), 500);
    } else {
      navigate("/b");
    }
  };

  return (
    <div
      style={{
        width: "393px",
        height: "852px",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
      onClick={handleBackgroundClick}
    >
      {showQR && (
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            transition: "opacity 0.3s ease-in-out",
            zIndex: "1",
          }}
          onClick={handleBackgroundClick}
        ></div>
      )}

      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowQR(true);
        }}
        style={{
          background: "none",
          border: "none",
          padding: "0",
          cursor: "pointer",
          position: "absolute",
          top: "155px",
          right: "7px",
          zIndex: "2",
        }}
      >
        <img src={buttonImage} alt="버튼" style={{ width: "65px", height: "65px" }} />
      </button>

      <div
        style={{
          position: "absolute",
          bottom: showQR ? (animateQR ? "0px" : "-520px") : "-520px",
          width: "393px",
          height: "520px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "bottom 0.5s ease-in-out",
          background: "rgba(255, 255, 255, 0.95)",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          zIndex: "3",
        }}
      >
        {showQR && (
          <img
            src={qrImage}
            alt="QR 코드"
            style={{ width: "70%", height: "100%" }}
          />
        )}
      </div>
    </div>
  );
};

export default App;
