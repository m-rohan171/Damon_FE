// import React, { useState } from "react";
// // import QrReader from "react-qr-reader";

// const QRCodeReader = () => {
//   const [qrData, setQRData] = useState("");

//   const handleScan = (data) => {
//     if (data) {
//       setQRData(data);
//     }
//   };

//   const handleError = (err) => {
//     console.error(err);
//   };

//   return (
//     <div>
//       <h2>QR Code Reader</h2>
//       <QrReader
//         delay={300}
//         onError={handleError}
//         onScan={handleScan}
//         style={{ width: "100%" }}
//       />
//       {qrData && <p>QR Code Data: {qrData}</p>}
//     </div>
//   );
// };

// export default QRCodeReader;
