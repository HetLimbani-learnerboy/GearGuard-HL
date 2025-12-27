import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function MaintenanceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>

      <button
        onClick={() => navigate(-1)}
        style={{
          border: "1px solid #ddd",
          padding: "6px 10px",
          borderRadius: "8px",
          background: "#f5f5f5",
          cursor: "pointer",
          marginBottom: "12px"
        }}
      >
        ← Back
      </button>

      <h2>Maintenance Request #{id}</h2>

      <p>(We will load real data here next)</p>

    </div>
  );
}
