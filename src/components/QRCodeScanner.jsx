import React, { useState, useEffect } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import "./QRCodeScanner.css";

const QRCodeScanner = ({ onScan }) => {
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if (scanning) {
      const codeReader = new BrowserMultiFormatReader();
      codeReader
        .decodeFromInputVideoDevice(undefined, "video")
        .then((result) => {
          onScan(result.text);
          setScanning(false);
        })
        .catch((err) => console.error(err));
    }
  }, [scanning, onScan]);

  return (
    <div className="qr-code-scanner-container">
      <button
        className="qr-code-scanner-button"
        onClick={() => setScanning(true)}
      >
        Start Scan
      </button>
      {scanning && (
        <video
          className="qr-code-scanner-video"
          id="video"
          width="300"
          height="200"
        ></video>
      )}
    </div>
  );
};

export default QRCodeScanner;

// import React, { useState, useEffect } from "react";
// import { BrowserMultiFormatReader } from "@zxing/library";
// import "./QRCodeScanner.css";

// const QRCodeScanner = ({ onScan }) => {
//   const [scanning, setScanning] = useState(false);
//   const [codeReader, setCodeReader] = useState(null);

//   useEffect(() => {
//     let mounted = true;

//     if (scanning) {
//       const reader = new BrowserMultiFormatReader();
//       setCodeReader(reader);

//       reader
//         .decodeFromInputVideoDevice(undefined, "video")
//         .then((result) => {
//           if (mounted) {
//             onScan(result.text);
//             setScanning(false);
//           }
//         })
//         .catch((err) => console.error(err));
//     }

//     return () => {
//       mounted = false;
//       if (codeReader) {
//         codeReader.reset();
//       }
//     };
//   }, [scanning, onScan, codeReader]);

//   const startScanning = () => {
//     setScanning(true);
//   };

//   const stopScanning = () => {
//     setScanning(false);
//   };

//   return (
//     <div className="qr-code-scanner-container">
//       <button className="qr-code-scanner-button" onClick={startScanning}>
//         Start Scan
//       </button>
//       <button className="qr-code-scanner-button" onClick={stopScanning}>
//         Stop Scan
//       </button>
//       {scanning && (
//         <video
//           className="qr-code-scanner-video"
//           id="video"
//           width="300"
//           height="200"
//         ></video>
//       )}
//     </div>
//   );
// };

// export default QRCodeScanner;
