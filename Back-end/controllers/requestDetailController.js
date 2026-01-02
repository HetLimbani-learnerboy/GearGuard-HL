const Maintenance = require("../models/Maintenance");
exports.getTestActivityDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const activityData = await Maintenance.findById(id);
        if (!activityData) {
            return res.status(404).json({
                success: false,
                message: "Activity record not found in system."
            });
        }
        res.status(200).json(activityData);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error while retrieving activity",
            error: error.message
        });
    }
};
exports.updateRequestStatus = async (req, res) => {
    try {
        const updateData = req.body;
        const updatedRequest = await Maintenance.findByIdAndUpdate(
            req.params.id,
            updateData,
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