import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
import "./Auth.css";

const LoginSignUp = () => {
  const [showLogin, setShowLogin] = useState(true);

  const handleToggleForm = () => {
    setShowLogin(!showLogin);
  };

  const handleLogin = (userData) => {
    // Implement login logic
    console.log("Login:", userData);
  };

  const handleSignup = (userData) => {
    // Implement signup logic
    console.log("Signup:", userData);
  };

  return (
    <div className="main-container-ls">
      <div className="login-signup-container">
        {showLogin ? (
          <Login onSubmit={handleLogin} />
        ) : (
          <Signup onSubmit={handleSignup} />
        )}
        <div className="form-toggle">
          {/* <button onClick={handleToggleForm}>
            {showLogin ? "Sign Up Instead" : "Log In Instead"}
          </button> */}
        </div>
        <p>
          {showLogin ? "Don't have an account? " : "Already have an account? "}
          <Link to="/login" onClick={handleToggleForm}>
            {showLogin ? "Sign up here" : "Log in here"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginSignUp;
