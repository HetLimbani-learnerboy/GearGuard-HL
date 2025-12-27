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

  const handleConfirmSelection = () => {
    if (!selectedWC) {
      alert("Please select a work center from the table.");
      return;
    }
    // Store the object for the modal to pick up
    localStorage.setItem("selectedWorkCenter", JSON.stringify(selectedWC));
    // Navigate back to the maintenance page where modal was open
    navigate(-1); 
  };

  return (
    <div className="workcenter-container">
      <div className="header-flex">
        <h2 className="page-title">Work Center Master</h2>
        <div className="action-btns">
            <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
            <button className="confirm-selection-btn" onClick={handleConfirmSelection}>
                Confirm Selection
            </button>
        </div>
      </div>

      <div className="search-box">
        <input
          className="search-input"
          placeholder="Search by center name, code, or tag..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table className="workcenter-table">
          <thead>
            <tr>
              <th>Select</th>
              <th>Work Center</th>
              <th>Code</th>
              <th>Tag</th>
              <th>Alternative Center</th>
              <th>Cost/Hr</th>
              <th>OEE Target</th>
            </tr>
          </thead>
          <tbody>
            {workCenters.length > 0 ? (
              workCenters.map((wc) => (
                <tr 
                    key={wc._id} 
                    className={selectedWC?._id === wc._id ? "selected-row" : ""}
                    onClick={() => setSelectedWC(wc)}
                >
                  <td>
                    <input
                      type="radio"
                      name="wc-radio"
                      checked={selectedWC?._id === wc._id}
                      onChange={() => setSelectedWC(wc)}
                    />
                  </td>
                  <td>{wc.work_center}</td>
                  <td>{wc.code}</td>
                  <td><span className={`tag-pill ${wc.tag}`}>{wc.tag}</span></td>
                  <td>{wc.alternative_work_center || "None"}</td>
                  <td>₹{wc.cost_per_hour}</td>
                  <td>{wc.oee_target}%</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="7" style={{textAlign:'center', padding: '20px'}}>No work centers found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkCenterPage;