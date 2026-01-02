import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./DashboardPage.css";

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [data, setData] = useState({ requests: [], stats: {} });
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3021/api/maintenance/dashboard?search=${search}`);
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };
    fetchData();
  }, [search]);

  return (
    <div className="dashboard-wrapper">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="main-area">
        <header className="top-bar">
          <button className="menu-toggle-btn" onClick={() => setIsSidebarOpen(true)}>
            <div className="bar"></div><div className="bar"></div><div className="bar"></div>
          </button>
          <Navbar title="Dashboard" />
        </header>

        <main className="content">
          <div className="action-header">
            <input
              type="text"
              className="dashboard-search-input"
              placeholder="Search assets, technicians..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="new-request-btn" onClick={() => navigate("/createrequest")}>
              <span>+</span> New Maintenance Request
            </button>
          </div>

          <div className="insight-grid">
            <div className="insight-card critical">
              <p className="insight-label">Critical Priority</p>
              <h3 className="insight-main">{data.stats.criticalUnits || 0} Units</h3>
              <p className="insight-sub">Needs Attention</p>
            </div>

            <div className="insight-card workload">
              <p className="insight-label">Technician Load</p>
              <h3 className="insight-main">{data.stats.technicianLoad || 0}% Utilized</h3>
              <p className="insight-sub">(Assign Carefully)</p>
            </div>

            <div className="insight-card requests">
              <p className="insight-label">Open Requests</p>
              <h3 className="insight-main">{data.stats.pendingRequests || 0} Pending</h3>
              <p className="insight-sub">{data.stats.overdueRequests || 0} Overdue</p>
            </div>
          </div>

          <div className="activity-section">
            <h2 className="section-title">Recent Activity</h2>
            <div className="table-container">
              <table className="activity-table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Requester</th>
                    <th>Technician</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Company</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.requests.map((item) => (
                    <tr key={item._id} onClick={() => navigate(`/test-activity/${item._id}`)}>
                      <td><b>{item.subject}</b></td>
                      <td>{item.name}</td>
                      <td>{item.technician}</td>
                      <td>{item.category}</td>
                      <td>
                        <span className={`status-badge ${item.status}`}>
                          {item.status.replace("_", " ")}
                        </span>
                      </td>
                      <td>{item.company}</td>
                      <td>{new Date(item.requestDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}