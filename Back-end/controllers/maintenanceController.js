// const Maintenance = require("../models/MaintenanceRequestdis");

// // GET all maintenance requests
// exports.getAllRequests = async (req, res) => {
//   try {
//     const requests = await Maintenance.find().sort({ createdAt: -1 });
//     res.status(200).json(requests);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching requests", error });
//   }
// };

// // POST a new request
// exports.createRequest = async (req, res) => {
//   try {
//     // Note: Frontend sends 'title' in the body according to your JSX
//     const newRequest = new Maintenance(req.body);
//     const savedRequest = await newRequest.save();
//     res.status(201).json(savedRequest);
//   } catch (error) {
//     res.status(400).json({ message: "Error creating request", error });
//   }
// };

// // PATCH (Update) status for Drag and Drop
// exports.updateStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;
//     const updated = await Maintenance.findByIdAndUpdate(
//       id,
//       { status },
//       { new: true }
//     );
//     res.status(200).json(updated);
//   } catch (error) {
//     res.status(400).json({ message: "Error updating status", error });
//   }
// };