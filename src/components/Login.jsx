import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setToken, clearToken } from "./AuthReducer";
import { BaseUrl } from "../shared/BaseUrl";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const token = useSelector((state) => state.auth.token);
  console.log({ token });
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      dispatch(setToken({ token: savedToken }));
    }
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BaseUrl}/api/auth/login`, {
        username,
        password,
      });
      // If login is successful, you may want to handle the response here
      console.log("Login success:", response.data);
      localStorage.setItem("token", response?.data?.token);
      dispatch(setToken({ token: response?.data?.token }));
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Navigate to the desired page after successful login
      navigate("/");
    } catch (error) {
      console.error("Login error:", error.message);
      // Handle error state or display an error message to the user
    }
  };

  return (
    <div className="main-container-ls">
      <div className="login-signup-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
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
          <button type="submit">Login</button>
        </form>
        <Link to="/signup">not registered? Signup here</Link>
      </div>
    </div>
  );
};

export default Login;
