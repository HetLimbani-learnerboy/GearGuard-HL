const mongoose = require("mongoose");

const MaintenanceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    subject: { type: String, required: true },
    maintenanceFor: { type: String, required: true },
    selectedTarget: { type: String, required: false },
    category: { type: String },
    requestDate: { type: Date },
    type: { type: String, required: true },
    team: { type: String, required: true },
    technician: { type: String },
    scheduledDate: { type: Date, required: true },
    duration: { type: Number },
    priority: { type: Number, default: 0 },
    company: { type: String },
    notes: { type: String },
    instructions: { type: String },
    status: {
        type: String,
        enum: ["new", "in_progress", "repaired", "scrap"],
        default: "new"
    }
}, { timestamps: true });

module.exports = mongoose.model("maintenance", MaintenanceSchema);