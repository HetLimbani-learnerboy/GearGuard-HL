import React, { useEffect, useState } from "react";

const TeamsPage = () => {
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(
    JSON.parse(localStorage.getItem("selectedTeam")) || null
  );

  useEffect(() => {
    fetch(`http://localhost:3021/api/teams?search=${search}`)
      .then((res) => res.json())
      .then((data) => setTeams(data))
      .catch((err) => console.error("Fetch error:", err));
  }, [search]);

  const handleSelect = (team) => {
    setSelectedTeam(team);
    localStorage.setItem("selectedTeam", JSON.stringify(team));
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Teams Directory</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by team name or location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={searchStyle}
      />

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Select</th>
              <th style={thStyle}>Team Name</th>
              <th style={thStyle}>Company Location</th>
              <th style={thStyle}>Team Members</th>
              <th style={thStyle}>Total Members</th>
            </tr>
          </thead>

          <tbody>
            {teams.length === 0 ? (
              <tr>
                <td colSpan="5" style={emptyStyle}>
                  No teams found
                </td>
              </tr>
            ) : (
              teams.map((team) => (
                <tr
                  key={team._id}
                  style={{
                    background:
                      selectedTeam?._id === team._id ? "#eef2ff" : "white"
                  }}
                >
                  <td style={tdStyle}>
                    <button
                      onClick={() => handleSelect(team)}
                      style={{
                        ...selectBtn,
                        background:
                          selectedTeam?._id === team._id
                            ? "#22c55e"
                            : "#2563eb"
                      }}
                    >
                      {selectedTeam?._id === team._id
                        ? "Selected"
                        : "Select"}
                    </button>
                  </td>

                  <td style={tdStyle}>{team.team_name}</td>
                  <td style={tdStyle}>{team.company_location}</td>
                  <td style={tdStyle}>
                    {team.team_members.join(", ")}
                  </td>
                  <td style={tdStyle}>{team.team_members.length}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Selected Team Display */}
      {selectedTeam && (
        <div style={selectedBox}>
          <h3>Selected Team</h3>
          <p><b>Name:</b> {selectedTeam.team_name}</p>
          <p><b>Location:</b> {selectedTeam.company_location}</p>
          <p><b>Members:</b> {selectedTeam.team_members.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

/* ---------------- STYLES ---------------- */

const searchStyle = {
  padding: 10,
  width: 320,
  marginBottom: 20
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  minWidth: 800
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

const selectBtn = {
  padding: "6px 12px",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  fontWeight: 600
};

const emptyStyle = {
  textAlign: "center",
  padding: 20
};

const selectedBox = {
  marginTop: 30,
  padding: 20,
  borderRadius: 10,
  background: "#f1f5f9",
  border: "1px solid #cbd5e1"
};

export default TeamsPage;
