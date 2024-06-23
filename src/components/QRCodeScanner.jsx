import React, { useState, useEffect, useRef } from "react";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";
import "./QRCodeScanner.css";

const QRCodeScanner = ({ onScan, backendUrl }) => {
  const [scanning, setScanning] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const codeReader = useRef(null);

  useEffect(() => {
    const startScanning = async () => {
      if (!codeReader.current) {
        codeReader.current = new BrowserMultiFormatReader();
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        setStream(stream);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          try {
            await videoRef.current.play();
          } catch (err) {
            console.error("Error playing video: ", err);
          }
        }

        codeReader.current.decodeFromVideoDevice(
          null,
          videoRef.current,
          (result, err) => {
            if (result) {
              captureImage();
              onScan(result);
              stopScanning();
            }
            if (err && !(err instanceof NotFoundException)) {
              console.error(err);
            }
          }
        );
      } catch (err) {
        console.error("Error accessing the camera: ", err);
      }
    };

    if (scanning) {
      startScanning();
    } else {
      if (codeReader.current) {
        codeReader.current.reset();
      }
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
    }

    return () => {
      if (codeReader.current) {
        codeReader.current.reset();
      }
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [scanning, onScan]);

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(sendImageToBackend, "image/jpeg");
    }
  };

  const sendImageToBackend = (result) => {
    console.log({ result });
    const qrData = {
      text: result.text,
      rawBytes: result.rawBytes,
      numBits: result.numBits,
      resultPoints: result.resultPoints,
      format: result.format,
      timestamp: result.timestamp,
      resultMetadata: result.resultMetadata,
    };

    fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: qrData }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("QR data saved successfully:", data);
      })
      .catch((error) => {
        console.error("Error saving QR data:", error);
      });
  };

  const stopScanning = () => {
    setScanning(false);
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  return (
    <div className="qr-code-scanner-container">
      <button
        className="qr-code-scanner-button"
        onClick={() => setScanning(true)}
        disabled={scanning}
      >
        Start Scan
      </button>
      {scanning && (
        <>
          <button className="qr-code-scanner-button" onClick={stopScanning}>
            Stop Scan
          </button>
          <video
            className="qr-code-scanner-video"
            ref={videoRef}
            width="300"
            height="225"
          ></video>
          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
        </>
      )}
    </div>
  );
};

export default QRCodeScanner;
