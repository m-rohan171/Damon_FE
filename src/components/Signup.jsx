import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";
import { toast } from "react-toastify"; // Import toast from react-toastify
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../shared/BaseUrl";
import { Link } from "react-router-dom";

const Signup = ({ onSubmit }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BaseUrl}/api/auth/signup`, {
        username,
        email,
        password,
      });

      if (response.data.status === 200) {
        toast.success(response.data.message.toString(), {
          position: "top-right",

          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/login");
      } else {
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      // If signup is successful, you may want to handle the response here
      console.log("Signup success:", response.data);

      // Navigate to the desired page after successful signup
      // Example: navigate("/dashboard");
    } catch (error) {
      console.error("Signup error:", error.message);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // Handle error state or display an error message to the user
    }
  };

  return (
    <div className="main-container-ls">
      <div className="login-signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <Link to="/login">Already a user? Log in here</Link>
      </div>
    </div>
  );
};

export default Signup;
