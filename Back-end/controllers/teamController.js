const Team = require("../models/Team");

// GET all teams (with search)
exports.getTeams = async (req, res) => {
  const { search } = req.query;

  const query = search
    ? {
        $or: [
          { team_name: { $regex: search, $options: "i" } },
          { company_location: { $regex: search, $options: "i" } }
        ]
      }
    : {};

  const teams = await Team.find(query);
  res.json(teams);
};

// GET single team
exports.getTeamById = async (req, res) => {
  const team = await Team.findById(req.params.id);
  if (!team) {
    return res.status(404).json({ message: "Team not found" });
  }
  res.json(team);
};

// CREATE team
exports.createTeam = async (req, res) => {
  const team = await Team.create(req.body);
  res.status(201).json(team);
};
