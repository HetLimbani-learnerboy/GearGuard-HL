// const mongoose = require("mongoose");

// const maintenanceRequestSchemadis = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     title: { type: String, required: true }, // Frontend sends 'subject' here
//     equipment: { type: String, required: true },
//     type: { type: String, default: "corrective" },
//     status: {
//       type: String,
//       enum: ["new", "in_progress", "repaired", "scrap"],
//       default: "new"
//     }
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("MaintenanceRequest", maintenanceRequestSchemadis);