import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const WorkCenterPageall = () => {
  const navigate = useNavigate();

  const [workCenters, setWorkCenters] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3021/api/workcenters?search=${search}`)
      .then((res) => res.json())
      .then((data) => setWorkCenters(data))
      .catch((err) => console.error("Fetch error:", err));
  }, [search]);

  return (
    <div style={{ padding: 30 }}>
      <h2>Work Centers</h2>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search by state, electronic, mechanical..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={searchStyle}
      />

      {/* TABLE */}
      <div style={{ overflowX: "auto" }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Work Center</th>
              <th style={thStyle}>Code</th>
              <th style={thStyle}>Tag</th>
              <th style={thStyle}>Alternative Work Center</th>
              <th style={thStyle}>Cost / Hour (₹)</th>
              <th style={thStyle}>Time Efficiency</th>
              <th style={thStyle}>OEE Target</th>
            </tr>
          </thead>

          <tbody>
            {workCenters.length === 0 ? (
              <tr>
                <td colSpan="7" style={emptyStyle}>
                  No work centers found
                </td>
              </tr>
            ) : (
              workCenters.map((wc) => (
                <tr key={wc._id}>
                  <td style={tdStyle}>{wc.work_center}</td>
                  <td style={tdStyle}>{wc.code}</td>
                  <td style={tdStyle}>{wc.tag}</td>
                  <td style={tdStyle}>{wc.alternative_work_center}</td>
                  <td style={tdStyle}>₹{wc.cost_per_hour}</td>
                  <td style={tdStyle}>{wc.cost_time_efficiency}</td>
                  <td style={tdStyle}>{wc.oee_target}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* BACK BUTTON */}
      <div style={{ marginTop: 30 }}>
        <button style={backBtn} onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
    </div>
  );
};

/* ---------------- STYLES ---------------- */

const searchStyle = {
  padding: 10,
  width: 380,
  marginBottom: 20
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  minWidth: 1000
};

const thStyle = {
  padding: "12px",
  background: "#f8fafc",
  borderBottom: "2px solid #cbd5e1",
  textAlign: "left",
  fontWeight: 700
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #e2e8f0"
};

const emptyStyle = {
  textAlign: "center",
  padding: 20
};

const backBtn = {
  padding: "10px 22px",
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: 600
};

export default WorkCenterPageall;
