import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUppage.css";
import signupImg from "../assets/Signup-img.png";

const SignUppage = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [passwordValid, setPasswordValid] = useState({
        length: false,
        upper: false,
        lower: false,
        number: false,
        special: false,
        match: false
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (value) => {
        setForm({ ...form, password: value });

        setPasswordValid({
            length: value.length >= 8,
            upper: /[A-Z]/.test(value),
            lower: /[a-z]/.test(value),
            number: /[0-9]/.test(value),
            special: /[!@#$%^&*]/.test(value),
            match: value === form.confirmPassword
        });
    };

    const handleConfirmPasswordChange = (value) => {
        setForm({ ...form, confirmPassword: value });
        setPasswordValid((prev) => ({
            ...prev,
            match: value === form.password
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const allValid = Object.values(passwordValid).every(Boolean);
        if (!allValid) {
            alert("Please meet all password requirements");
            return;
        }

        try {
            const response = await fetch("http://localhost:3021/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: form.username,
                    email: form.email,
                    password: form.password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Signup failed");
                return;
            }

            alert("Signup successful");
            navigate("/dashboard");

        } catch (error) {
            alert("Backend not reachable");
            console.error(error);
        }
    };

    return (
        <div className="gearguard-split-screen">
            <div className="gearguard-image-side">
                <img src={signupImg} alt="GearGuard Asset" className="side-asset" />
            </div>

            <div className="gearguard-form-side">
                <div className="gearguard-card">
                    <h1 className="gearguard-title">Create Account</h1>
                    <p className="gearguard-subtitle">Join <b>GearGuard</b> today</p>

                    <form className="gearguard-form" onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="username"
                                required
                                value={form.username}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={form.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <div className="pass-box">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={form.password}
                                    onChange={(e) => handlePasswordChange(e.target.value)}
                                    required
                                />
                                <span className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? "HIDE" : "SHOW"}
                                </span>
                            </div>
                        </div>

                        <div className="password-rules">
                            <p style={{ color: passwordValid.length ? "green" : "red" }}>• Minimum 8 characters</p>
                            <p style={{ color: passwordValid.upper ? "green" : "red" }}>• Uppercase letter</p>
                            <p style={{ color: passwordValid.lower ? "green" : "red" }}>• Lowercase letter</p>
                            <p style={{ color: passwordValid.number ? "green" : "red" }}>• Number [0-9]</p>
                            <p style={{ color: passwordValid.special ? "green" : "red" }}>• Special character [!@#$%^&*]</p>
                        </div>

                        <div className="form-group">
                            <label>Confirm Password</label>
                            <div className="pass-box">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={form.confirmPassword}
                                    onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                                    required
                                />
                                <span className="eye-btn" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? "HIDE" : "SHOW"}
                                </span>
                            </div>
                        </div>

                        <div className="password-rules">
                            <p style={{ color: passwordValid.match ? "green" : "red" }}>• Passwords match</p>
                        </div>

                        <button type="submit" className="gearguard-btn">
                            Register Now
                        </button>
                    </form>

                    <p className="footer-link">
                        Already have an account?{" "}
                        <span onClick={() => navigate("/loginpage")}>Log In</span>
                    </p>
                    <p className="footer-link">
            <span onClick={() => navigate("/")}>← Back to Home</span>
          </p>
                </div>
            </div>
        </div>
    );
};

export default SignUppage;
