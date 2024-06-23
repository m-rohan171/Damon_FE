import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <ToastContainer />
        <div className="content-container">
          {/* <Sidebar /> */}
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
