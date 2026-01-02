const Maintenance = require("../models/Maintenance");

exports.createRequest = async (req, res) => {
  try {
    const newRequest = new Maintenance(req.body);
    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query = {
        $or: [
          { subject: { $regex: search, $options: "i" } },
          { name: { $regex: search, $options: "i" } },
          { technician: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } }
        ]
      };
    }
    const requests = await Maintenance.find(query).sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch requests",
      error: error.message
    });
  }
};

exports.updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updatedRequest = await Maintenance.findByIdAndUpdate(
      req.params.id,
      { status: status },
      { new: true, runValidators: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(400).json({ message: "Update failed", error: error.message });
  }
};

exports.getRequestById = async (req, res) => {
  try {
    const request = await Maintenance.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Not found" });
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: "Error fetching details", error: error.message });
  }
};

exports.getDashboardData = async (req, res) => {
  try {
    const { search } = req.query;

    let query = {};
    if (search) {
      query = {
        $or: [
          { subject: { $regex: search, $options: "i" } },
          { name: { $regex: search, $options: "i" } },
          { technician: { $regex: search, $options: "i" } }
        ]
      };
    }
    const requests = await Maintenance.find(query).sort({ createdAt: -1 });
    const totalRequests = await Maintenance.countDocuments();
    const pendingCount = await Maintenance.countDocuments({ status: "new" });
    const overdueCount = await Maintenance.countDocuments({
      status: { $in: ["new", "in_progress"] },
      scheduledDate: { $lt: new Date() }
    });

    const criticalCount = await Maintenance.countDocuments({ priority: 3 });

    res.status(200).json({
      requests,
      stats: {
        criticalUnits: criticalCount,
        technicianLoad: 85,
        pendingRequests: pendingCount,
        overdueRequests: overdueCount
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTestActivityDetail = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Activity ID format" });
    }

    const request = await Maintenance.findById(id);

    if (!request) {
      return res.status(404).json({ message: "Activity details not found" });
    }

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching test activity details",
      error: error.message
    });
  }
};

exports.getCalendarData = async (req, res) => {
  try {
    const requests = await Maintenance.find()
      .sort({ scheduledDate: 1 });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching calendar data",
      error: error.message
    });
  }
};