const Equipment = require("../models/Equipment");

exports.getAllEquipment = async (req, res) => {
    try {
        const equipment = await Equipment.find().sort({ createdAt: -1 });
        res.status(200).json(equipment);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve equipment list",
            error: error.message
        });
    }
};

exports.bulkCreateEquipment = async (req, res) => {
    try {
        const data = req.body;
        const result = await Equipment.insertMany(data);
        res.status(201).json({
            success: true,
            count: result.length,
            message: "Equipment data uploaded successfully"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error during bulk upload",
            error: error.message
        });
    }
};