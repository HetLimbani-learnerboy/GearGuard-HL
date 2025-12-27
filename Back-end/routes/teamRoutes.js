const express = require("express");
const router = express.Router();

const {
  getTeams,
  getTeamById,
  createTeam
} = require("../controllers/teamController");

router.get("/teams", getTeams);
router.get("/teams/:id", getTeamById);
router.post("/teams", createTeam);

module.exports = router;
