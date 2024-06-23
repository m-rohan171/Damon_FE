import React from "react";
import "./Header.css";
import Button from "../Utils/Buttons/Button";
import { useNavigate } from "react-router-dom";
import Logo from "../image/tattQr.png";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      navigate("./login");
    } catch (error) {
      console.log("error is", error);
    }
  };
  return (
    <div className="navbar">
      <div className="logoDiv">
        <img src={Logo} className="logo" alt="" srcset="" />
      </div>

      <button onClick={handleLogout}>
        <i className="fa fa-fw fa-user"></i> Logout
      </button>
    </div>
  );
};

export default Header;
