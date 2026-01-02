import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TeamsPage.css";

const TeamsPage = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(
    JSON.parse(localStorage.getItem("selectedTeam")) || null
  );

  const [newTeam, setNewTeam] = useState({
    team_name: "",
    company_location: "",
    memberCount: "",
    team_members: []
  });

  useEffect(() => {
    fetchTeams();
  }, [search]);

  const fetchTeams = () => {
    fetch(`http://localhost:3021/api/teams?search=${search}`)
      .then((res) => res.json())
      .then((data) => setTeams(data))
      .catch((err) => console.error("Fetch error:", err));
  };

  const handleMemberCountChange = (count) => {
    const n = parseInt(count) || 0;
    const members = new Array(n).fill("");
    setNewTeam({ ...newTeam, memberCount: count, team_members: members });
  };

  const handleMemberNameChange = (index, name) => {
    const updatedMembers = [...newTeam.team_members];
    updatedMembers[index] = name;
    setNewTeam({ ...newTeam, team_members: updatedMembers });
  };

  const handleAddTeamSubmit = async (e) => {
    e.preventDefault();

    if (newTeam.team_members.some(m => m.trim() === "")) {
      alert("Please fill in all team member names.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3021/api/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          team_name: newTeam.team_name,
          company_location: newTeam.company_location,
          team_members: newTeam.team_members
        })
      });
      if (res.ok) {
        setShowAddForm(false);
        setNewTeam({ team_name: "", company_location: "", memberCount: "", team_members: [] });
        fetchTeams();
      }
    } catch (err) {
      console.error("Error adding team:", err);
    }
  };

  const handleContinue = () => {
    if (!selectedTeam) {
      alert("Please select a team to continue.");
      return;
    }
    localStorage.setItem("selectedTeam", JSON.stringify(selectedTeam));
    navigate(-1);
  };

  return (
    <div className="teams-master-wrapper">
      <div className="teams-master-header">
        <div className="title-section">
          <h2>Select Maintenance Team</h2>
          <p>Assign a qualified team for the service request</p>
        </div>
        <div className="teams-header-actions">

          <button className="teams-btn-add" onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? "Close Form" : "+ Add New Team"}
          </button>

          <button className="teams-info-btn" onClick={() => navigate('/equipmentdetails')}>View Equipment Info.</button>
          <button className="teams-btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
          <button
            className={`teams-btn-primary ${!selectedTeam ? 'disabled' : ''}`}
            onClick={handleContinue}
          >
            Continue Selection
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="add-team-card">
          <form onSubmit={handleAddTeamSubmit}>
            <div className="form-grid">
              <div className="field-block">
                <label>Team Name <span className="star">*</span></label>
                <input
                  required
                  placeholder="e.g. Tau Tools"
                  value={newTeam.team_name}
                  onChange={(e) => setNewTeam({ ...newTeam, team_name: e.target.value })}
                />
              </div>
              <div className="field-block">
                <label>Company Location <span className="star">*</span></label>
                <input
                  required
                  placeholder="e.g. Amsterdam, Netherlands"
                  value={newTeam.company_location}
                  onChange={(e) => setNewTeam({ ...newTeam, company_location: e.target.value })}
                />
              </div>
              <div className="field-block">
                <label>Number of Members <span className="star">*</span></label>
                <input
                  required
                  type="number"
                  min="1"
                  value={newTeam.memberCount}
                  placeholder="e.g. 3"
                  onChange={(e) => handleMemberCountChange(e.target.value)}
                />
              </div>
            </div>

            {newTeam.team_members.length > 0 && (
              <div className="members-dynamic-list">
                <h4>Member Details <span className="sub-hint">(All fields required)</span></h4>
                <div className="members-grid">
                  {newTeam.team_members.map((name, index) => (
                    <div className="field-block" key={index}>
                      <label>Team Member {index + 1} <span className="star">*</span></label>
                      <input
                        required
                        placeholder="Enter full name"
                        value={name}
                        onChange={(e) => handleMemberNameChange(index, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="form-footer-btns">
              <button type="submit" className="teams-btn-primary submit-new-team">Save New Team</button>
            </div>
          </form>
        </div>
      )}

      <div className="teams-search-bar">
        <input
          type="text"
          placeholder="Search by team name or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="teams-table-card">
        <table className="teams-table">
          <thead>
            <tr>
              <th className="col-radio">Select</th>
              <th>Team Name</th>
              <th>Company Location</th>
              <th>Team Members</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team._id} className={selectedTeam?._id === team._id ? "row-active" : ""} onClick={() => setSelectedTeam(team)}>
                <td className="col-radio">
                  <div className={`custom-radio ${selectedTeam?._id === team._id ? 'checked' : ''}`}></div>
                </td>
                <td><strong>{team.team_name}</strong></td>
                <td>{team.company_location}</td>
                <td className="member-list-cell">{team.team_members.join(", ")}</td>
                <td><span className="count-badge">{team.team_members.length}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamsPage;