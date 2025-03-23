import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const App: React.FC = () => {
  const navigate = useNavigate();

  const handleVerifyOwnership = () => {
    navigate("/c");
  };

  return (
    <div className="App">
      <nav>
        <button className="back-btn">&lt;</button>
        <p className="navbar-title">TOKENIZE</p>
      </nav>

      <div className="main">
        <div className="main-container">
          <h2 className="title">Tokenize Your Vehicle</h2>
          <p className="subtitle">
            Enter your vehicle details to create a digital token
          </p>

          <div className="tabs-container">
            <button className="btn1 tab">Manual Entry</button>
            <button className="btn2 tab">Scan Documents</button>
          </div>

          <div className="input-container">
            <input className="input-field" type="text" placeholder="Car model" />
            <input className="input-field" type="text" placeholder="Car age" />
            <input className="input-field" type="text" placeholder="VIN number" />
            <input className="input-field" type="text" placeholder="Vehicle mileage" />
            <input className="input-field" type="text" placeholder="Vehicle number" />
          </div>

          <button className="verify-button" onClick={handleVerifyOwnership}>
            <span className="button-icon">🛡️</span> Verify Ownership
          </button>
          <button className="tokenize-button">
            <span className="button-icon">✨</span> Tokenize Car
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
