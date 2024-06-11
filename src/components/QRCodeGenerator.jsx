import React, { useState } from "react";
import QRCode from "qrcode.react";
import axios from "axios";
import "./QRCodeGenerator.css";

const QRCodeGenerator = () => {
  const [text, setText] = useState("");
  const [generatedQR, setGeneratedQR] = useState("");

  const handleGenerate = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/qrcode", {
        text,
      });
      setGeneratedQR(response.data.qrCodeData);
    } catch (error) {
      console.error("Error generating QR code", error);
    }
  };

  return (
    <div className="qr-code-generator-container">
      <input
        className="qr-code-generator-input"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="qr-code-generator-button" onClick={handleGenerate}>
        Generate QR Code
      </button>
      {generatedQR && <QRCode className="qr-code" value={generatedQR} />}
    </div>
  );
};

export default QRCodeGenerator;
