import React, { useEffect, useState } from "react";
import "./TeamsPageall.css";

const TeamsPageall = () => {
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
      {/* Header */}
      <div className="teams-header">
        <h1>Teams Directory</h1>
        <p>View and manage all maintenance teams across locations.</p>

        <input
          className="search-input"
          type="text"
          placeholder="Search by team name or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table Card */}
      <div className="teams-card">
        <table className="teams-table">
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
                  <td className="team-name">{team.team_name}</td>
                  <td>{team.company_location}</td>
                  <td className="members">
                    {team.team_members.join(", ")}
                  </td>
                  <td>
                    <span className="count-badge">
                      {team.team_members.length}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamsPageall;
