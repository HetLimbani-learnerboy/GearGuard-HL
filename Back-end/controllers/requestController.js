const MaintenanceRequest = require("../models/MaintenanceRequest");

/* CREATE MAINTENANCE REQUEST */
exports.createRequest = async (req, res) => {
  try {
    const {
      name,
      subject,
      maintenanceFor,
      selectedTarget
    } = req.body;

    if (!name || !subject || !maintenanceFor || !selectedTarget) {
      return res.status(400).json({
        message: "Required fields missing"
      });
    }

    const request = await MaintenanceRequest.create(req.body);

    res.status(201).json(request);
  } catch (error) {
    console.error("Create Request Error:", error);
    res.status(500).json({
      message: "Failed to create request",
      error: error.message
    });
  }
};

/* GET ALL REQUESTS */
exports.getRequests = async (req, res) => {
  try {
    const requests = await MaintenanceRequest.find()
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch requests"
    });
  }
};
