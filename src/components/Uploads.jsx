import React, { useState } from "react";
import QRCode from "qrcode.react";
import axios from "axios";
import "./QRCodeGenerator.css";

const Uploads = () => {
  const [text, setText] = useState("");
  const [qrCodeURL, setQRCodeURL] = useState("");

  const handleGenerate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/qrcode/qrcode",
        { text }
      );
      setQRCodeURL(response.data.qrCodeURL);
    } catch (error) {
      console.error("Error generating QR code", error);
    }
  };

  return (
    <div className="qr-code-generator-container">
      <div className="generator-containers">
        <input
          style={{
            borderRadius: "2rem",
            border: "2px solid rgb(243, 181, 98)",
          }}
          className="qr-code-generator-input"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="qr-code-generator-button" onClick={handleGenerate}>
          Generate QR Code
        </button>
        {qrCodeURL && (
          <div className="qr-code-image-container">
            {<QRCode className="qr-code" value={qrCodeURL} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Uploads;
