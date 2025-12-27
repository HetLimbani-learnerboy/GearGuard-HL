import React from "react";
import Navbar from "./Navbar";
import "./DashboardPage.css";
import { useNavigate } from "react-router-dom";


export default function DashboardPage() {
    const navigate = useNavigate();

  return (
    <div className="dashboard-wrapper">

      {/* Sidebar */}
      <aside className="sidebar">
  <div className="sidebar-header">GearGuard</div>

  <div className="sidebar-item active" onClick={() => navigate("/")}>
    Dashboard
  </div>

  <div className="sidebar-item" onClick={() => navigate("/maintenance")}>
    Maintenance
  </div>

  <div className="sidebar-item">Equipment</div>
  <div className="sidebar-item">Calendar</div>
  <div className="sidebar-item">Teams</div>
  <div className="sidebar-item">Reports</div>
</aside>


      {/* Main */}
      <div className="main-area">

        {/* Navbar (reusable) */}
        <Navbar title="Dashboard" />

        {/* Content */}
        <main className="content">

          {/* Dashboard Cards */}
          <div className="cards">
            <div className="card">
              <h3>Open Requests</h3>
              <div className="card-value">12</div>
            </div>

            <div className="card">
              <h3>In Progress</h3>
              <div className="card-value">5</div>
            </div>

            <div className="card">
              <h3>Preventive Scheduled</h3>
              <div className="card-value">9</div>
            </div>

            <div className="card">
              <h3>Scrapped Equipment</h3>
              <div className="card-value">2</div>
            </div>
          </div>

          {/* Chart / analytics placeholder */}
          <div className="placeholder-box">
            Requests by Team (Chart Coming Soon)
          </div>

        </main>
      </div>
    </div>
  );
}
