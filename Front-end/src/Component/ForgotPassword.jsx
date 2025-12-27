import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import forgotImg from "../assets/Forgot-img.png";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  const [form, setForm] = useState({
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [valid, setValid] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false,
    match: false
  });

  // STEP 1
  const checkEmail = async () => {
    const res = await fetch("http://localhost:3021/api/check-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    if (!res.ok) {
      alert("Email not found");
      return;
    }

    setStep(2);
  };

  // PASSWORD RULES
  const handlePasswordChange = (value) => {
    setForm({ ...form, password: value });

    setValid({
      length: value.length >= 8,
      upper: /[A-Z]/.test(value),
      lower: /[a-z]/.test(value),
      number: /[0-9]/.test(value),
      special: /[!@#$%^&*]/.test(value),
      match: value === form.confirmPassword
    });
  };

  const handleConfirmChange = (value) => {
    setForm({ ...form, confirmPassword: value });
    setValid((prev) => ({
      ...prev,
      match: value === form.password
    }));
  };

  // STEP 2
  const submitPassword = async () => {
    const allValid = Object.values(valid).every(Boolean);
    if (!allValid) {
      alert("Password rules not satisfied");
      return;
    }

    const res = await fetch("http://localhost:3021/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password: form.password
      })
    });

    if (!res.ok) {
      alert("Password update failed");
      return;
    }

    alert("Password updated successfully");
    navigate("/loginpage");
  };



return (
  <div className="gearguard-split-screen">
    <div className="gearguard-image-side">
        <div className="triangle-clipper">
            <img src={forgotImg} alt="Forgot Password Asset" className="side-asset" />
        </div>
        </div>
    <div className="gearguard-form-side">
      <div className="gearguard-card">
        <h1 className="gearguard-title">Forgot Password</h1>
        <p className="gearguard-subtitle">Reset your <b>Maintenance Account</b></p>

        <div className="gearguard-form">
          {step === 1 && (
            <div className="form-group">
              <label>Work Email</label>
              <input
                type="email"
                placeholder="Enter registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button className="gearguard-btn" onClick={checkEmail}>Next Step</button>
            </div>
          )}

          {step === 2 && (
            <>
              <div className="form-group">
                <label>New Password</label>
                <div className="pass-box">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    onChange={(e) => handlePasswordChange(e.target.value)}
                  />
                  <span className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "HIDE" : "SHOW"}
                  </span>
                </div>
              </div>

              <div className="password-rules-grid">
                <p className={valid.length ? "v-valid" : "v-invalid"}>• Min 8 characters</p>
                <p className={valid.upper ? "v-valid" : "v-invalid"}>• Uppercase</p>
                <p className={valid.lower ? "v-valid" : "v-invalid"}>• Lowercase</p>
                <p className={valid.number ? "v-valid" : "v-invalid"}>• Number</p>
                <p className={valid.special ? "v-valid" : "v-invalid"}>• Special char</p>
                <p className={valid.match ? "v-valid" : "v-invalid"}>• Passwords match</p>
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <div className="pass-box">
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm Password"
                    onChange={(e) => handleConfirmChange(e.target.value)}
                  />
                  <span className="eye-btn" onClick={() => setShowConfirm(!showConfirm)}>
                    {showConfirm ? "HIDE" : "SHOW"}
                  </span>
                </div>
              </div>

              <button className="gearguard-btn" onClick={submitPassword}>Update Password</button>
            </>
          )}
        </div>
        <p className="footer-link">Remembered? <span onClick={() => navigate("/loginpage")}>Back to Login</span></p>
      </div>
    </div>
  </div>
  );
};

export default ForgotPassword;
