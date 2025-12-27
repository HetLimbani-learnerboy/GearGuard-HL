const mongoose = require("mongoose");

const maintenanceRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    subject: { type: String, required: true },

    maintenanceFor: {
      type: String,
      enum: ["equipment", "work_center"],
      required: true
    },

    selectedTarget: { type: String, required: true }, // equipment OR work center
    address: { type: String },

    category: { type: String },
    requestDate: { type: String },

    type: {
      type: String,
      enum: ["corrective", "preventive"],
      default: "corrective"
    },

    team: { type: String },
    technician: { type: String },

    scheduledDate: { type: String },
    duration: { type: Number },

    priority: {
      type: Number,
      min: 0,
      max: 3,
      default: 0
    },

    company: { type: String },

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

/* 🔐 SAFE EXPORT (NO OVERWRITE ERROR) */
module.exports =
  mongoose.models.MaintenanceRequest ||
  mongoose.model("MaintenanceRequest", maintenanceRequestSchema);
