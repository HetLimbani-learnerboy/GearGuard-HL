import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EquipmentPage = () => {
  const navigate = useNavigate();

  const [equipment, setEquipment] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3021/api/equipment?search=${search}`)
      .then((res) => res.json())
      .then((data) => setEquipment(data))
      .catch((err) => console.error("Fetch error:", err));
  }, [search]);

  return (
    <div style={{ padding: 30 }}>
      <h2>Equipment List</h2>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search equipment by name, type, or location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={searchStyle}
      />

      {/* TABLE */}
      <div style={{ overflowX: "auto" }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Equipment Name</th>
              <th style={thStyle}>Type</th>
              <th style={thStyle}>Serial Number</th>
              <th style={thStyle}>Location</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>

          <tbody>
            {equipment.length === 0 ? (
              <tr>
                <td colSpan="5" style={emptyStyle}>
                  No equipment found
                </td>
              </tr>
            ) : (
              equipment.map((eq) => (
                <tr key={eq._id}>
                  <td style={tdStyle}>{eq.name}</td>
                  <td style={tdStyle}>{eq.type}</td>
                  <td style={tdStyle}>{eq.serial_number}</td>
                  <td style={tdStyle}>{eq.location}</td>
                  <td style={tdStyle}>{eq.status}</td>
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



export default EquipmentPage;
