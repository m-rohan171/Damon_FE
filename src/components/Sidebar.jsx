// import React, { useState } from "react";
// import {
//   FaBars,
//   FaTimes,
//   FaList,
//   FaTemperatureHigh,
//   FaSoundcloud,
// } from "react-icons/fa"; // Import icons from react-icons library
// import "./Sidebar.css";

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className={`sidebar ${isOpen ? "open" : ""}`}>
//       <button className="sidebar-toggle" onClick={toggleSidebar}>
//         {isOpen ? <FaTimes /> : <FaBars />}
//       </button>
//       <div className="sidebar-content">
//         {isOpen ? (
//           <ul className="sidebar-menu">
//             <li className="sidebar-menu-item">Scanner</li>
//             <li className="sidebar-menu-item">Generator</li>
//             <li className="sidebar-menu-item">View Codes</li>
//           </ul>
//         ) : (
//           <div className="sidebar-icons">
//             <FaSoundcloud className="sidebar-icon" />
//             <FaTemperatureHigh className="sidebar-icon" />
//             <FaList className="sidebar-icon" />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// Sidebar.jsx
import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaList,
  FaTemperatureHigh,
  FaSoundcloud,
} from "react-icons/fa"; // Import icons from react-icons library
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
              onClick={() => onMenuItemClick("Scanner")} // Call onMenuItemClick with "Scanner" as argument
            >
              Scanner
            </li>
            <li
              className="sidebar-menu-item"
              onClick={() => onMenuItemClick("Generator")} // Call onMenuItemClick with "Generator" as argument
            >
              Generator
            </li>
            <li className="sidebar-menu-item">View Codes</li>
          </ul>
        ) : (
          <div className="sidebar-icons">
            <FaSoundcloud className="sidebar-icon" />
            <FaTemperatureHigh className="sidebar-icon" />
            <FaList className="sidebar-icon" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
