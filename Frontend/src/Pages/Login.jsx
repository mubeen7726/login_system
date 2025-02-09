"use client"
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { handleSuccess, handleError } from "./utils";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin= async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if ( !email || !password) {
      return handleError("email, and password are required");
    }
    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message,jwttoken,name, error } = result;
      if (success) {
        localStorage.setItem("jwtToken", jwttoken);
        localStorage.setItem("name", name);
        handleSuccess(message);
        setTimeout(() => {
          navigate("/Home");
        }, 1000);
      } else if (error) {
        const detail = error?.details?.[0].message;
        handleError(detail);
      }else if (!success){
        handleError(message);
      }
    } catch (err) {
      handleError(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyloginInfo = { ...loginInfo };
    copyloginInfo[name] = value;
   setLoginInfo(copyloginInfo);
  };

  console.log("LoginInfo :>", loginInfo);
  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={loginInfo.email}
            onChange={handleChange}
            name="email"
            placeholder="Enter your Email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            value={loginInfo.password}
            type="password"
            name="password"
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">Login</button>
        <span>
          Does't have an account?
          <Link to="/Singup">Signup</Link>
          <ToastContainer />
        </span>
      </form>
    </div>
  );
};

export default Login;