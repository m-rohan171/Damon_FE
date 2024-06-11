// // import React, { useState } from "react";
// // import QRCodeScanner from "./components/QRCodeScanner";
// // import QRCodeGenerator from "./components/QRCodeGenerator";
// // import axios from "axios";
// // import "./App.css";

// // const App = () => {
// //   const [scannedData, setScannedData] = useState("");

// //   const handleScan = async (data) => {
// //     setScannedData(data);
// //     try {
// //       const response = await axios.get(`/api/qrcode/${data}`);
// //       console.log("Scanned data:", response.data);
// //     } catch (error) {
// //       console.error("Error fetching scanned data", error);
// //     }
// //   };

// //   return (
// //     <div className="app-container">
// //       <h1 className="app-heading">QR Code App</h1>
// //       <QRCodeScanner onScan={handleScan} />
// //       <QRCodeGenerator />
// //       {scannedData && <div>Scanned Data: {scannedData}</div>}
// //     </div>
// //   );
// // };

// // export default App;

// import React, { useState } from "react";
// import Header from "./components/Header";
// import Sidebar from "./components/Sidebar";
// import QRCodeScanner from "./components/QRCodeScanner";
// import QRCodeGenerator from "./components/QRCodeGenerator";

// import axios from "axios";
// import "./App.css";

// const App = () => {
//   const [scannedData, setScannedData] = useState("");

//   const handleScan = async (data) => {
//     setScannedData(data);
//     try {
//       const response = await axios.get(`/api/qrcode/${data}`);
//       console.log("Scanned data:", response.data);
//     } catch (error) {
//       console.error("Error fetching scanned data", error);
//     }
//   };

//   return (
//     <div className="app-container">
//       <Header />
//       <div className="content-container">
//         <Sidebar />
//         <main className="main-content">
//           <h2 className="main-heading">Scanner</h2>
//           <QRCodeScanner onScan={handleScan} />
//           <br />
//           {scannedData && (
//             <div>
//               <b>Scanned Data:</b> <br />
//               <span style={{ color: "#007bff" }}>{scannedData}</span>{" "}
//             </div>
//           )}
//           <h2 className="main-heading">Generator</h2>
//           <QRCodeGenerator />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import QRCodeScanner from "./components/QRCodeScanner";
import QRCodeGenerator from "./components/QRCodeGenerator";

import axios from "axios";
import "./App.css";
import Footer from "./components/Footer";

const App = () => {
  const [scannedData, setScannedData] = useState("");
  const [selectedMenuItem, setSelectedMenuItem] = useState(""); // State to keep track of the selected menu item

  const handleScan = async (data) => {
    setScannedData(data);
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

  return (
    <div className="app-container">
      <Header />
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
                  <b>Scanned Data:</b> <br />
                  <span style={{ color: "#007bff" }}>{scannedData}</span>{" "}
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
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default App;
