import React, { useState } from "react";
import { BrowserQRCodeReader } from "@zxing/library";
import "./QRCodeUploader.css";

const QRCodeUploader = ({ onScan }) => {
  const [uploadError, setUploadError] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = () => {
          const codeReader = new BrowserQRCodeReader();
          codeReader
            .decodeFromImageElement(image)
            .then((result) => {
              onScan(result.text);
              setUploadError(null);
            })
            .catch((err) => {
              console.error("Error decoding QR code: ", err);
              setUploadError("Could not decode QR code. Please try again.");
            });
        };
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="qr-code-uploader-container">
      <label htmlFor="file-upload" className="custom-file-upload">
        Upload QR Code
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="qr-code-uploader-input"
      />
      {uploadError && <p className="qr-code-uploader-error">{uploadError}</p>}
    </div>
  );
};

export default QRCodeUploader;
