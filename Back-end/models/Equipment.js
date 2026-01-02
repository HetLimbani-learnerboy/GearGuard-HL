const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema({
  equipmentName: { type: String, required: true },
  employee: { type: String, required: true },
  department: { type: String, required: true },
  serialNumber: { type: String, required: true, unique: true },
  technician: { type: String, required: true },
  equipmentCategory: { type: String, required: true },
  company: { type: String, required: true },
  responsible: { type: String, required: true },
  usedBy: { type: String, default: "Employee" },
  maintenanceTeam: { type: String, default: "Internal" },
  usedInLocation: { type: String },
  workCenter: { type: String },
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Equipments", equipmentSchema);