import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ title }) {
  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const closeOnOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    };
    document.addEventListener("mousedown", closeOnOutside);
    return () => document.removeEventListener("mousedown", closeOnOutside);
  }, []);

  return (
    <header className="top-navbar">
      {/* LEFT: PAGE TITLE */}
      <div className="navbar-left">
        <h2>{title}</h2>
      </div>

      {/* RIGHT: SEARCH + PROFILE */}
      <div className="navbar-right">
        <input
          type="text"
          className="nav-search"
          placeholder="Search..."
        />

        <div className="profile-wrapper" ref={profileRef}>
          <div
            className="profile-icon"
            onClick={() => setOpenProfile(!openProfile)}
          >
            AN
          </div>

          {openProfile && (
            <div className="profile-dropdown">
              <p className="profile-name">Aman Nair</p>
              <p className="profile-email">aman.nair@gearguard.com</p>

              <button
                className="logout-btn"
                onClick={() => navigate("/loginpage")}
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
