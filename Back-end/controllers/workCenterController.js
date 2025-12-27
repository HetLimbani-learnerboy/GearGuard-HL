const WorkCenter = require("../models/WorkCenter");

exports.getWorkCenters = async (req, res) => {
  try {
    const { search } = req.query;

    const query = search
      ? {
          $or: [
            { work_center: { $regex: search, $options: "i" } },
            { tag: { $regex: search, $options: "i" } },
            { code: { $regex: search, $options: "i" } }
          ]
        }
      : {};

    const data = await WorkCenter.find(query).sort({ work_center: 1 });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch" });
  }
};

exports.getSingleWorkCenter = async (req, res) => {
  try {
    const data = await WorkCenter.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Work center not found" });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ message: "Invalid work center ID" });
  }
};
