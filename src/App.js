import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Main from "./pages/Main";
import Footer from "./components/Footer";
import LoginSignUp from "./pages/Auth"; // Import LoginSignUp page
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import default styles

import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Dashboard } from "./components/Dashboard";
import QRCodeGenerator from "./components/Content";

const App = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("un");

  useEffect(() => {
    if (userId) {
      document.body.style.backgroundColor = "white"; // or any other color you want to set when userId is present
    } else {
      document.body.style.backgroundColor = "rgb(117, 117, 117)";
    }

    return () => {
      // Cleanup: reset the background color when the component unmounts or userId changes
      document.body.style.backgroundColor = "rgb(117, 117, 117)";
    };
  }, [userId]);

  return (
    <div className="app-container">
      {!userId && <Header />}
      <ToastContainer />
      <div className="content-container">
        {/* <Sidebar /> */}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/content" element={<QRCodeGenerator />} />
        </Routes>
      </div>
      {!userId && <Footer />}
    </div>
  );
};

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
