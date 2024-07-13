import React, { useEffect, useLayoutEffect, useState } from "react";
import { Layout, Spin } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import { BaseUrl } from "../shared/BaseUrl";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import ReactPlayer from "react-player";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import "./currentContent.css";

const { Content } = Layout;

export const CurrentContent = () => {
  const [qrCodeURL, setQRCodeURL] = useState("");
  const [currentContent, setCurrentContent] = useState("");
  const [qrId, setQrId] = useState();
  const token = localStorage.getItem("token");
  // const { userId } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("un");

  useLayoutEffect(() => {
    const fetchQr = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/qrcode/user/qr`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.data === null) {
          // Check if data is null
          // navigate("/content"); // Navigate to the desired route
        } else {
          setQRCodeURL(response.data.text);
          setQrId(response?.data?._id);
        }
        console.log(response.data);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          if (error.response.data.data === null) {
            toast.error("no content found yet please generate one", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            console.error("Login error:", error.response.data.message);
          }
        } else {
          console.error("Login error:", error.message);
        }
      }
    };
    fetchQr();
  }, [token]);

  // useEffect(() => {
  //   const fetchCurrentQr = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${BaseUrl}/api/content/current-content/${qrId}`,
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       );

  //       toast.success(response.data.message, {
  //         position: "top-right",
  //         autoClose: 3000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //       });
  //       setCurrentContent(response?.data.currentContent);
  //     } catch (error) {
  //       console.error("Login error:", error.message);
  //     }
  //   };
  //   fetchCurrentQr();
  // }, [qrId, token]);

  useEffect(() => {
    const fetchCurrentQr = async () => {
      try {
        const endpoint = userId ? `user/${userId}` : `qr/${qrId}`;

        // console.log("Endpoint:", endpoint);
        // console.log("BaseUrl:", BaseUrl);
        // console.log("userId:", userId);
        // console.log("token:", token);

        const response = await axios.get(
          `${BaseUrl}/api/content/current-content/${endpoint}`,
          {
            headers: { Authorization: `Bearer ${token}` },
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

        setCurrentContent(response?.data.currentContent);
      } catch (error) {
        console.error("Error fetching current content:", error.message);
      }
    };

    fetchCurrentQr();
  }, [userId, qrId, token]);

  console.log(currentContent.text);

  return (
    <Layout
      style={{
        padding: "0 24px 24px",
        height: "95vh",
        // width: "100%",
        background: "transparent",
        alignItems: "center",
        justifyContent: "center",
        // border: "1px solid #d9d9d9",
      }}
    >
      <div>
        {/* <h1 style={{ color: "F3B562" }}>Current content</h1> */}
        {/* <QRCode className="qr-code" value={qrCodeURL} /> */}
        {currentContent?.contentType === "image" && (
          <img
            style={{
              alignItems: "center",
              width: "75vw",
              height: "80vh",
              alignContent: "center",
            }}
            src={currentContent.contentUrl}
            alt=""
          />
        )}
        {currentContent?.contentType === "audio" && (
          <AudioPlayer
            autoPlay
            src={currentContent.contentUrl}
            onPlay={(e) => console.log("onPlay")}
            className="react-player"

            // other props here
          />
        )}
        {currentContent?.contentType === "video" && (
          <ReactPlayer
            playing={true}
            url={currentContent.contentUrl}
            height={"70vh"}
            width={"80vw"}
            controls={true}
          />
        )}
        {currentContent?.contentType === "text" && (
          <p style={{ color: "black" }}>{currentContent?.text}</p>
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
      </div>
    </Layout>
  );
};
