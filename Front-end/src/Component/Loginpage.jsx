import React, { useState } from "react";
import "./Loginpage.css";

const Loginpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Connect API / Odoo Auth here
    console.log("Login clicked", { email, password });
  };

  return (
    <div className="loginpage-container">
      <div className="login-card">
        <h2 className="login-title">GearGuard Login</h2>
        <p className="login-subtitle">Access your Maintenance Dashboard</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="forgot-link">Forgot password?</p>
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="signup-text">
          Don’t have an account? <span>Create Account</span>
        </p>
      </div>
    </div>
  );
};

export default Loginpage;
