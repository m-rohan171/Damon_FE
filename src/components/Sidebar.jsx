import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaUpload,
  FaQrcode,
  FaCamera,
  FaRegEdit,
} from "react-icons/fa"; // Import icons from react-icons library
import { TfiDashboard } from "react-icons/tfi";
import { MdContentCopy } from "react-icons/md";
import "./Sidebar.css";

const Sidebar = ({ onMenuItemClick }) => {
  // Receive onMenuItemClick function as a prop
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      <div className="sidebar-content">
        {isOpen ? (
          <ul className="sidebar-menu">
            <li
              className="sidebar-menu-item"
              onClick={() => onMenuItemClick("Dashboard")} // Call onMenuItemClick with "Scanner" as argument
            >
              Dashboard
            </li>
            <li
              className="sidebar-menu-item"
              onClick={() => onMenuItemClick("CurrentContent")} // Call onMenuItemClick with "Scanner" as argument
            >
              Current Content
            </li>
            {/* <li
              className="sidebar-menu-item"
              onClick={() => onMenuItemClick("Scanner")} // Call onMenuItemClick with "Scanner" as argument
            >
              Scanner
            </li> */}
            {/* <li
              className="sidebar-menu-item"
              onClick={() => onMenuItemClick("Uploads")} // Call onMenuItemClick with "Scanner" as argument
            >
              Upload
            </li> */}
            <li
              className="sidebar-menu-item"
              onClick={() => onMenuItemClick("Generator")} // Call onMenuItemClick with "Generator" as argument
            >
              Generator
            </li>
            {/* <li
              className="sidebar-menu-item"
              onClick={() => onMenuItemClick("Uploader")}
            >
              Uploader
            </li> */}
            <li
              className="sidebar-menu-item"
              onClick={() => onMenuItemClick("Content")}
            >
              CreateContentForm
            </li>
          </ul>
        ) : (
          <div className="sidebar-icons">
            <div
              className="sidebar-icon"
              data-tooltip="Dashboard"
              onClick={() => onMenuItemClick("Dashboard")}
            >
              <TfiDashboard />
              <div className="tooltip">Dashboard</div>
            </div>
            <div
              className="sidebar-icon"
              data-tooltip="CurrentContent"
              onClick={() => onMenuItemClick("CurrentContent")}
            >
              <FaRegEdit />
              <div className="tooltip">CurrentContent</div>
            </div>
            <div
              className="sidebar-icon"
              data-tooltip="Generator"
              onClick={() => onMenuItemClick("Generator")}
            >
              <FaQrcode />
              <div className="tooltip">Generator</div>
            </div>
            <div
              className="sidebar-icon"
              data-tooltip="Content"
              onClick={() => onMenuItemClick("Content")}
            >
              <MdContentCopy />
              <div className="tooltip">Create Content form</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
