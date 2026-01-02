import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WorkCenterPage.css";

const WorkCenterPage = () => {
  const navigate = useNavigate();
  const [workCenters, setWorkCenters] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedWC, setSelectedWC] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3021/api/workcenters?search=${search}`)
      .then((res) => res.json())
      .then((data) => setWorkCenters(data))
      .catch((err) => console.error("API Error:", err));
  }, [search]);

  const handleContinue = () => {
    if (!selectedWC) {
      alert("Please select a work center to continue.");
      return;
    }
    localStorage.setItem("selectedWorkCenter", JSON.stringify(selectedWC));
    navigate(-1);
  };

  return (
    <div className="wc-master-wrapper">
      <div className="wc-master-header">
        <div className="title-section">
          <h2>Select Work Center</h2>
          <p>Choose the operational hub for this maintenance task</p>
        </div>
        <div className="wc-header-actions">
          <button className="wc-btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
          <button
            className={`wc-btn-primary ${!selectedWC ? 'disabled' : ''}`}
            onClick={handleContinue}
          >
            Continue Selection
          </button>
        </div>
      </div>

      <div className="wc-search-bar">
        <input
          type="text"
          placeholder="Filter by name, code, or type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="wc-table-card">
        <table className="wc-table">
          <thead>
            <tr>
              <th className="col-radio">Select</th>
              <th>Work Center</th>
              <th>Identifier Code</th>
              <th>Category</th>
              <th>Cost / Hour</th>
              <th>OEE Target</th>
            </tr>
          </thead>
          <tbody>
            {workCenters.length > 0 ? (
              workCenters.map((wc) => (
                <tr
                  key={wc._id}
                  className={selectedWC?._id === wc._id ? "row-active" : ""}
                  onClick={() => setSelectedWC(wc)}
                >
                  <td className="col-radio">
                    <div className={`custom-radio ${selectedWC?._id === wc._id ? 'checked' : ''}`}></div>
                  </td>
                  <td><strong>{wc.work_center}</strong></td>
                  <td><code className="wc-code-badge">{wc.code}</code></td>
                  <td><span className={`wc-tag-pill ${wc.tag}`}>{wc.tag}</span></td>
                  <td>₹{wc.cost_per_hour}</td>
                  <td>{wc.oee_target}%</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" className="wc-no-data">Scanning for work centers...</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkCenterPage;