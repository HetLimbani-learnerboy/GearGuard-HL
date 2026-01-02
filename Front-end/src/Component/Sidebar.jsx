import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Maintenance", path: "/maintenance" },
    { name: "Maintenance Calendar", path: "/maintenancecalendar" },
    { name: "Equipment", path: "/equipmentdetails" },
    { name: "Work Centers", path: "/workcenterpageall" },
    { name: "Teams", path: "/teampageall" },
  ];

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}

      <aside className={`sidebar-container ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          GearGuard
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <div
              key={item.path}
              className={`sidebar-link ${location.pathname === item.path ? "active" : ""}`}
              onClick={() => {
                navigate(item.path);
                onClose();
              }}
            >
              {item.name}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;