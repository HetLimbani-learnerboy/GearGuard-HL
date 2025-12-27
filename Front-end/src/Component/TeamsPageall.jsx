import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TeamsPageall.css";

const TeamsPageall = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3021/api/teams?search=${search}`)
      .then((res) => res.json())
      .then((data) => setTeams(data))
      .catch((err) => console.error("Fetch error:", err));
  }, [search]);

  return (
    <div className="teams-page">
      <h2 className="page-title">Teams Directory</h2>

      {/* Search */}
      <input
        className="search-input"
        type="text"
        placeholder="Search by team name or location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Team Name</th>
              <th>Company Location</th>
              <th>Team Members</th>
              <th>Total Members</th>
            </tr>
          </thead>

          <tbody>
            {teams.length === 0 ? (
              <tr>
                <td colSpan="4" className="empty-text">
                  No teams found
                </td>
              </tr>
            ) : (
              teams.map((team) => (
                <tr key={team._id}>
                  <td>{team.team_name}</td>
                  <td>{team.company_location}</td>
                  <td>{team.team_members.join(", ")}</td>
                  <td>{team.team_members.length}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>
    </div>
  );
};

export default TeamsPageall;
