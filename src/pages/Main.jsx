import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import QRCodeScanner from "../components/QRCodeScanner";
import QRCodeGenerator from "../components/QRCodeGenerator";
import QRCodeUploader from "../components/QRCodeUploader";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./Main.css";
import { Dashboard } from "../components/Dashboard";
import CreateContentForm from "../components/Content";
import { CurrentContent } from "../components/CurrentContent";

const Main = () => {
  const [scannedData, setScannedData] = useState("");
  const [selectedMenuItem, setSelectedMenuItem] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("un");

  useEffect(() => {
    setSelectedMenuItem(userId ? "CurrentContent" : "Generator");
  }, [userId]);

  const handleScan = async (data) => {
    console.log({ data });
    setScannedData(data.text);
    try {
      const response = await axios.get(`/api/qrcode/${data}`);
      console.log("Scanned data:", response.data);
    } catch (error) {
      console.error("Error fetching scanned data", error);
    }
  };

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    setScannedData(""); // Reset scanned data when a menu item is clicked
  };

  const handleUploadScan = async (data) => {
    setScannedData(data);
    try {
      const response = await axios.get(`/api/qrcode/${data}`);
      console.log("Scanned data:", response.data);
    } catch (error) {
      console.error("Error fetching scanned data", error);
    }
  };

  // Render only CurrentContent if userId is present
  if (userId) {
    return <CurrentContent />;
  }

  return (
    <div className="app-container">
      <div className="content-container">
        <Sidebar onMenuItemClick={handleMenuItemClick} />
        <main className="main-content">
          {(selectedMenuItem === "Scanner" || selectedMenuItem === "") && (
            <>
              <h2 className="main-heading">Scanner</h2>
              <QRCodeScanner onScan={handleScan} />
              <br />
              {scannedData && (
                <div>
                  <b style={{ color: "rgb(243, 181, 98)", marginTop: "2rem" }}>
                    Scanned Content:
                  </b>{" "}
                  <br />
                  <p
                    href=""
                    style={{ color: "rgb(243, 181, 98)", marginTop: "2rem" }}
                  >
                    {scannedData}
                  </p>{" "}
                </div>
              )}
            </>
          )}
          {selectedMenuItem === "Generator" && (
            <>
              <h2 className="main-heading">Generator</h2>
              <QRCodeGenerator />
            </>
          )}
          {selectedMenuItem === "Uploader" && (
            <>
              <h2 className="main-heading">Uploader</h2>
              <QRCodeUploader onScan={handleUploadScan} />
              <br />
              {scannedData && (
                <div>
                  <b>Uploaded QR Code Data:</b> <br />
                  <p href="" style={{ color: "#007bff" }}>
                    {scannedData}
                  </p>{" "}
                </div>
              )}
            </>
          )}
          {selectedMenuItem === "Dashboard" && <Dashboard />}
          {selectedMenuItem === "CurrentContent" && <CurrentContent />}
          {selectedMenuItem === "Content" && <CreateContentForm />}
        </main>
      </div>
    </div>
  );
};

export default Main;
