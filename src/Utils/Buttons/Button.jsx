import React from "react";
import "./Button.css";

const Button = ({ props }) => {
  return (
    <div>
      <button
        className="globalButton"
        // onClick={() => setScanning(true)}
        // disabled={scanning}
      >
        {props}
      </button>
    </div>
  );
};

export default Button;
