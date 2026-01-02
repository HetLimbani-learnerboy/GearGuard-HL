import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ title = "GearGuard Dashboard" }) {
  const [openProfile, setOpenProfile] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const profileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email");
    if (storedUsername) setUsername(storedUsername.replace(/"/g, ""));
    if (storedEmail) setEmail(storedEmail.replace(/"/g, ""));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="gg-navbar">
      <div className="gg-nav-center">
        <h1 className="gg-nav-brand">{title}</h1>
      </div>

      <div className="gg-nav-right">
        <div className="gg-profile-container" ref={profileRef}>
          <div
            className="gg-avatar-trigger"
            onClick={() => setOpenProfile((prev) => !prev)}
          >
            {username ? username.charAt(0).toUpperCase() : "U"}
          </div>

          {openProfile && (
            <div className="gg-profile-menu">
              <div className="gg-user-meta">
                <p className="gg-user-name">Name: {username || "User"}</p>
                <p className="gg-user-email">
                  Email: {email || "user@gearguard.com"}
                </p>
              </div>

              <div className="gg-menu-divider"></div>

              <button
                className="gg-logout-action"
                onClick={() => {
                  localStorage.clear();
                  navigate("/loginpage");
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

    </header>
  );
}
