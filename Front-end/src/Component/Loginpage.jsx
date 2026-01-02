import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Loginpage.css";
import gearsignimg from "../assets/Gearguard-img.png";

const Loginpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3021/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.message || "Login failed");
        return;
      }
      alert("Login successful");
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("email", data.user.email);
      navigate("/dashboard");
    } catch (error) {
      alert("Server not reachable");
      console.error(error);
    }
  };

  return (
    <div className="gearguard-split-screen">
      <div className="gearguard-form-side">
        <div className="gearguard-card">
          <div className="gearguard-header">
            <h1 className="gearguard-title">GearGuard</h1>
            <p className="gearguard-subtitle">
              Access your <b>Maintenance Dashboard</b>
            </p>
          </div>

          <form className="gearguard-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="pass-box">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "HIDE" : "SHOW"}
                </span>
              </div>
              <p className="forgot-text" onClick={() => navigate("/forgotpassword")}>Forgot password?</p>
            </div>

            <button type="submit" className="gearguard-btn">
              Login Now
            </button>
          </form>

          <p className="footer-link">
            Don’t have an account? <span onClick={() => navigate("/signuppage")}>Create Account</span>
          </p>
          <p className="footer-link">
            <span onClick={() => navigate("/")}>← Back to Home</span>
          </p>
        </div>
      </div>

      <div className="gearguard-image-side">
        <div className="rectangle-container">
          <img src={gearsignimg} alt="GearGuard Asset" className="side-asset" />
        </div>
      </div>
    </div>
  );
};

export default Loginpage;