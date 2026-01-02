import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./WorkCenterPageall.css";

const WorkCenterPageall = () => {
  const navigate = useNavigate();
  const [workCenters, setWorkCenters] = useState([]);
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3021/api/workcenters?search=${search}`)
      .then((res) => res.json())
      .then((data) => setWorkCenters(data))
      .catch((err) => console.error("Fetch error:", err));
  }, [search]);

  return (
    <div className="wc-page-container">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="wc-header-section">
        <div className="header-left-group">
          <button className="menu-toggle-btn" onClick={() => setIsSidebarOpen(true)}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </button>
          <h2 className="wc-title">Work Centers</h2>
        </div>

        <input
          type="text"
          className="wc-search-input"
          placeholder="Search by state, category, or code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="wc-table-wrapper">
        <table className="wc-data-table">
          <thead>
            <tr>
              <th>Work Center</th>
              <th>Code</th>
              <th>Tag</th>
              <th>Alternative Center</th>
              <th>Cost / Hr</th>
              <th>Efficiency</th>
              <th>OEE Target</th>
            </tr>
          </thead>
          <tbody>
            {workCenters.length === 0 ? (
              <tr><td colSpan="7" className="wc-empty-row">No work centers found</td></tr>
            ) : (
              workCenters.map((wc, index) => (
                <tr key={wc._id} style={{ "--row-index": index }}>
                  <td data-label="Work Center"><b>{wc.work_center}</b></td>
                  <td data-label="Code"><span className="wc-badge-code">{wc.code}</span></td>
                  <td data-label="Tag"><span className={`wc-tag ${wc.tag?.toLowerCase()}`}>{wc.tag}</span></td>
                  <td data-label="Alternative">{wc.alternative_work_center || "N/A"}</td>
                  <td data-label="Cost">₹{wc.cost_per_hour}</td>
                  <td data-label="Efficiency">{wc.cost_time_efficiency}%</td>
                  <td data-label="OEE Target">{wc.oee_target}%</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkCenterPageall;