import React, { useEffect, useLayoutEffect, useState } from "react";
import { Table, Layout, Spin, Checkbox, Modal } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import { BaseUrl } from "../shared/BaseUrl";
import QRCode from "qrcode.react";
import { toast } from "react-toastify";

const { Content } = Layout;

export const Dashboard = () => {
  const [qrCodeURL, setQRCodeURL] = useState("");
  const [qrId, setQrId] = useState();
  const [contents, setContents] = useState([]); // State to store fetched content
  const [loading, setLoading] = useState(true); // State to manage loading spinner
  const [currentContentId, setCurrentContentId] = useState(null); // State to store current content id
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("token");

  useLayoutEffect(() => {
    const fetchQr = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/qrcode/user/qr`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
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
    if (qrId) {
      const fetchContents = async () => {
        try {
          const response = await axios.get(
            `${BaseUrl}/api/content/contents/${qrId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setContents(response?.data?.contents); // Store the fetched content in state
          setCurrentContentId(response?.data?.currentContent?._id); // Store current content id
          setLoading(false); // Set loading to false after data is fetched
        } catch (error) {
          console.error("Fetch content error:", error.message);
          setLoading(false); // Set loading to false in case of error
        }
      };
      fetchContents();
    }
  }, [qrId, token]);

  // Filter contents by type
  const audioContents = contents.filter((item) => item.contentType === "audio");
  const videoContents = contents.filter((item) => item.contentType === "video");
  const imageContents = contents.filter((item) => item.contentType === "image");
  const textContents = contents.filter((item) => item.contentType === "text");

  const handleCheckboxChange = async (checked, record) => {
    console.log({ record });
    if (checked) {
      setIsModalOpen(true);
      setCurrentContentId(record._id);
    } else {
      setCurrentContentId(null); // Uncheck if already checked
    }
  };

  const handleOk = async () => {
    const response = await axios.post(
      `${BaseUrl}/api/content/set/${currentContentId}`,
      { qrId: qrId },
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
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Define columns for each table
  const columns = [
    {
      title: "ID",
      key: "index",
      render: (text, record, index) => index + 1, // Render a simple counting number
    },
    {
      title: "Text",
      dataIndex: "text",
      key: "text",
      render: (text) => (text ? text : "NA"), // Render "NA" for null or empty values
    },
    {
      title: "Content URL",
      dataIndex: "contentUrl",
      key: "contentUrl",
      render: (text) =>
        text ? (
          <a href={text} target="_blank" rel="noopener noreferrer">
            {text}
          </a>
        ) : (
          "NA"
        ), // Render "NA" for null or empty values
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "",
      key: "checkbox",
      render: (text, record) => (
        <Checkbox
          checked={record._id === currentContentId}
          onChange={(e) => handleCheckboxChange(e.target.checked, record)}
        >
          {/* {record._id === currentContentId && (
            <span style={{ marginLeft: 5, fontWeight: "bold" }}>
              Current Content
            </span>
          )} */}
        </Checkbox>
      ), // Render a checkbox and check it if the id matches current content id
    },
  ];

  return (
    <Layout style={{ padding: "0 24px 24px" }}>
      <QRCode className="qr-code" value={qrCodeURL} />
      <Content style={{ margin: "24px 0" }}>
        {loading ? (
          <Spin
            tip="Loading..."
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          />
        ) : (
          <>
            <h2>Audio</h2>
            <Table
              columns={columns}
              dataSource={audioContents}
              pagination={false}
              rowKey="_id"
            />

            <h2>Video</h2>
            <Table
              columns={columns}
              dataSource={videoContents}
              pagination={false}
              rowKey="_id"
            />

            <h2>Images</h2>
            <Table
              columns={columns}
              dataSource={imageContents}
              pagination={false}
              rowKey="_id"
            />
            <h2>Text</h2>
            <Table
              columns={columns}
              dataSource={textContents}
              pagination={false}
              rowKey="_id"
            />
          </>
        )}
      </Content>
      <Modal
        title="Change content"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          style: { backgroundColor: "rgb(243, 181, 98)" },
        }}
      >
        <p>Are you sure you want change the current content</p>
      </Modal>
    </Layout>
  );
};
