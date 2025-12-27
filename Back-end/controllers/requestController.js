const MaintenanceRequest = require("../models/MaintenanceRequest");

// CREATE: Save new request
exports.createRequest = async (req, res) => {
  try {
    const newRequest = new MaintenanceRequest(req.body);
    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    console.error("DB Storage Error:", error);
    res.status(400).json({ 
      message: "Data storage failed. Ensure all required fields are present.", 
      error: error.message 
    });
  }
};

// GET: Fetch all requests for Kanban
exports.getRequests = async (req, res) => {
  try {
    const requests = await MaintenanceRequest.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch requests" });
  }
};

// PATCH: Update status when dragging between columns
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await MaintenanceRequest.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: "Status update failed" });
  }
};