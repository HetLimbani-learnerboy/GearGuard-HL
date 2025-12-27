const mongoose = require("mongoose");

const workCenterSchema = new mongoose.Schema({
  work_center: String,
  code: String,
  tag: String,
  alternative_work_center: String,
  cost_per_hour: Number,
  cost_time_efficiency: Number,
  oee_target: Number
});

module.exports = mongoose.model("workcenter", workCenterSchema);
