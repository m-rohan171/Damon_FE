import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import axios from "axios";
import "./QRCodeGenerator.css";
import { useSelector } from "react-redux";
import { BaseUrl } from "../shared/BaseUrl";
import { toast } from "react-toastify";
const QRCodeGenerator = () => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [generatedQR, setGeneratedQR] = useState("");
  const [qrCodeURL, setQRCodeURL] = useState("");

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchQr = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/qrcode/user/qr`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log({ response });
        setQRCodeURL(response.data._id);
      } catch (error) {
        console.error("Login error:", error.message);
      }
    };
    fetchQr();
  }, []);

  const handleGenerate = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file); // Append file to FormData

      // JSON object with text and qrCodeURL
      const data = {
        text: text,
        qrCodeId: qrCodeURL, // Ensure the key matches what the backend expects (qrCodeId vs qrCodeURL)
      };

      const response = await axios.post(
        `${BaseUrl}/api/content/content`,
        formData, // Send FormData as request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Set Content-Type for FormData
          },
          params: data, // Send text and qrCodeId as URL params or query params (optional)
        }
      );
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log({ response });
    } catch (error) {
      console.error("Error generating QR code", error);
    }
  };

  return (
    <div className="qr-code-generator-container">
      <div className="generator-containers">
        Upload content
        <br />
        <input
          style={{
            borderRadius: "2rem",
            border: "2px solid rgb(243, 181, 98)",
          }}
          className="qr-code-generator-input"
          type="text"
          placeholder="Enter text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={file !== null} // Disable text input if a file is selected
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          disabled={text !== ""} // Disable file input if text is entered
        />
        <button className="qr-code-generator-button" onClick={handleGenerate}>
          Save
        </button>
      </div>
    </div>
  );
};
export default QRCodeGenerator;
