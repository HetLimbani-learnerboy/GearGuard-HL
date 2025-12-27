const Request = require("../models/MaintenanceRequest");

// CREATE new request
exports.createRequest = async (req, res) => {
  try {
    const newRequest = new Request(req.body);
    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    console.error("Error creating request:", error);
    res.status(400).json({ message: "Failed to create request", error: error.message });
  }
};

// GET all requests (sorted by newest first)
exports.getRequests = async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch requests", error: error.message });
  }
};

// UPDATE request status (for Drag and Drop)
exports.updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await Request.findByIdAndUpdate(id, { status }, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: "Update failed", error: error.message });
  }
};