import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./DashboardPage.css";

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">GearGuard</div>

        <div className="sidebar-item active">Dashboard</div>
        <div
          className="sidebar-item"
          onClick={() => navigate("/maintenance")}
        >
          Maintenance
        </div>
        <div className="sidebar-item" onClick={()=>{navigate('/equipmentpage')}}>Equipment</div>
        <div className="sidebar-item" onClick={()=>{navigate('/workcenterpageall')}}>Work Centers</div>
        <div className="sidebar-item" onClick={()=>{navigate('/teampageall')}}>Teams</div>
      </aside>

      {/* Main Area */}
      <div className="main-area">
        {/* ✅ SAME NAVBAR */}
        <Navbar title="Dashboard" />

        <main className="content">
          {/* Stats Cards */}
          <div className="cards">
            <div className="stat-card">
              <p className="stat-title">Open Requests</p>
              <h3 className="stat-value">12</h3>
            </div>

            <div className="stat-card">
              <p className="stat-title">In Progress</p>
              <h3 className="stat-value">5</h3>
            </div>

            <div className="stat-card">
              <p className="stat-title">Preventive Scheduled</p>
              <h3 className="stat-value">9</h3>
            </div>

            <div className="stat-card">
              <p className="stat-title">Scrapped Equipment</p>
              <h3 className="stat-value">2</h3>
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="chart-placeholder">
            Requests by Team (Chart Coming Soon)
          </div>
        </main>
      </div>
    </div>
  );
}
