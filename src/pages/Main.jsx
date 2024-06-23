import React, { useState } from "react";
// import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import QRCodeScanner from "../components/QRCodeScanner";
import QRCodeGenerator from "../components/QRCodeGenerator";
import QRCodeUploader from "../components/QRCodeUploader"; // Import QRCodeUploader component

import axios from "axios";
import "./Main.css";
import { Dashboard } from "../components/Dashboard";
import Uploads from "../components/Uploads";
import CreateContentForm from "../components/Content";
import { CurrentContent } from "../components/CurrentContent";
// import Footer from "./components/Footer";

const Main = () => {
  const [scannedData, setScannedData] = useState("");
  const [selectedMenuItem, setSelectedMenuItem] = useState("CurrentContent");

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

  return (
    <div className="app-container">
      {/* <Header /> */}
      <div className="content-container">
        <Sidebar onMenuItemClick={handleMenuItemClick} />{" "}
        {/* Pass the handleMenuItemClick function as a prop */}
        <main className="main-content">
          {(selectedMenuItem === "Scanner" || selectedMenuItem === "") && ( // Conditionally render the QRCodeScanner component
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
          {selectedMenuItem === "Generator" && ( // Conditionally render the QRCodeGenerator component
            <>
              <h2 className="main-heading">Generator</h2>
              <QRCodeGenerator />
            </>
          )}
          {/* {selectedMenuItem === "Uploads" && <Uploads />} */}
          {selectedMenuItem === "Uploader" && ( // Conditionally render the QRCodeUploader component
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
      {/* <Footer /> */}
    </div>
  );
};

export default Main;
