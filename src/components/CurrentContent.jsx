import React, { useEffect, useLayoutEffect, useState } from "react";
import { Layout, Spin } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import { BaseUrl } from "../shared/BaseUrl";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import ReactPlayer from "react-player";
import QRCode from "qrcode.react";

const { Content } = Layout;

export const CurrentContent = () => {
  const [qrCodeURL, setQRCodeURL] = useState("");
  const [currentContent, setCurrentContent] = useState("");
  const [qrId, setQrId] = useState();
  const token = useSelector((state) => state.auth.token);

  useLayoutEffect(() => {
    const fetchQr = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/qrcode/user/qr`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQRCodeURL(response.data.text);
        setQrId(response.data._id);
      } catch (error) {
        console.error("Login error:", error.message);
      }
    };
    fetchQr();
  }, [token]);

  useEffect(() => {
    const fetchCurrentQr = async () => {
      try {
        const response = await axios.get(
          `${BaseUrl}/api/content/current-content/${qrId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCurrentContent(response?.data.currentContent);
      } catch (error) {
        console.error("Login error:", error.message);
      }
    };
    fetchCurrentQr();
  }, [qrId, token]);

  console.log({ currentContent });

  return (
    <Layout style={{ padding: "0 24px 24px" }}>
      {/* <QRCode className="qr-code" value={qrCodeURL} /> */}
      {currentContent?.contentType === "image" && (
        <img src={currentContent.contentUrl} alt="" />
      )}
      {currentContent?.contentType === "audio" && (
        <AudioPlayer
          autoPlay
          src={currentContent.contentUrl}
          onPlay={(e) => console.log("onPlay")}
          // other props here
        />
      )}
      {currentContent?.contentType === "video" && (
        <ReactPlayer playing={true} url={currentContent.contentUrl} />
      )}
      {/* Loading spinner */}
      {!currentContent && (
        <Spin
          tip="Loading..."
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        />
      )}
    </Layout>
  );
};
