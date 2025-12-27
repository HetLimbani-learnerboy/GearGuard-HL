const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    team_name: { type: String, required: true },
    team_members: [{ type: String }],
    company_location: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Team", teamSchema);
