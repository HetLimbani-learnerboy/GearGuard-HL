const mongoose = require("mongoose");

const maintenanceRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    subject: { type: String, required: true },
    maintenanceFor: { type: String, enum: ["equipment", "work_center"], default: "equipment" },
    selectedTarget: { type: String, required: true }, // Equipment Name or Work Center Name
    address: { type: String },
    category: { type: String },
    requestDate: { type: Date },
    type: { type: String, enum: ["corrective", "preventive"], default: "corrective" },
    team: { type: String },
    technician: { type: String },
    scheduledDate: { type: Date },
    duration: { type: Number },
    priority: { type: Number, min: 0, max: 3, default: 0 },
    company: { type: String, default: "My Company" },
    notes: { type: String },
    instructions: { type: String },
    status: {
      type: String,
      enum: ["new", "in_progress", "repaired", "scrap"],
      default: "new"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("MaintenanceRequest", maintenanceRequestSchema);