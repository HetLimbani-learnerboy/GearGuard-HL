import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUppage.css";
import signupImg from "../assets/Signup-img.png";

const SignUppage = () => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        navigate('/dashboard');
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match");
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
        } catch (error) {
            alert("Error connecting to server. Is your backend running?");
        }
    };

    return (
        <div className="gearguard-split-screen">
            {/* Left Side: Triangle Image Area */}
            <div className="gearguard-image-side">
                <img src={signupImg} alt="GearGuard Asset" className="side-asset" />
            </div>

            {/* Right Side: Signup Form */}
            <div className="gearguard-form-side">
                <div className="gearguard-card">
                    <div className="gearguard-header">
                        <h1 className="gearguard-title">Create Account</h1>
                        <p className="gearguard-subtitle">Join <b>GearGuard</b> today</p>
                    </div>

                    <form className="gearguard-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter username"
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
                                placeholder="work@company.com"
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
                                    name="password"
                                    placeholder="Create password"
                                    required
                                    value={form.password}
                                    onChange={handleChange}
                                />
                                <span className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? "HIDE" : "SHOW"}
                                </span>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Confirm Password</label>
                            <div className="pass-box">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Confirm password"
                                    required
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                />
                                <span className="eye-btn" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? "HIDE" : "SHOW"}
                                </span>
                            </div>
                        </div>

                        <button type="submit" className="gearguard-btn">Register Now</button>
                    </form>

                    <p className="footer-link">Already have an account? <span onClick={() => window.location.href='/loginpage'}>Log In</span></p>
                </div>
            </div>
        </div>
    );
};

export default SignUppage;