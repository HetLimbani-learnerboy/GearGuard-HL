import "./DashboardPage.css";
import { useNavigate } from "react-router-dom";
// import { FiUser } from "react-icons/fi";
// import Navbar from "./Navbar";

export default function DashboardPage() {
  return (
    <div className="dashboard-wrapper">

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">GearGuard</div>

        <div className="sidebar-item active">Dashboard</div>
        <div className="sidebar-item">Equipment</div>
        <div className="sidebar-item">Calendar</div>
        <div className="sidebar-item">Teams</div>
        <div className="sidebar-item">Reports</div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1 }}>
        
        {/* Navbar
        <Navbar title="Dashboard" /> */}


        <main style={{ padding: "18px" }}>
          
          {/* Cards */}
          <div className="cards">
            <div className="card">
              <h3>Open Requests</h3>
              <div className="card-value">12</div>
            </div>

            <div className="card">
              <h3>Overdue Tasks</h3>
              <div className="card-value">4</div>
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

          {/* Chart placeholder */}
          <div className="placeholder-box">
            Coming soon: Request analytics chart
          </div>

        </main>
      </div>
    </div>
  );
}
