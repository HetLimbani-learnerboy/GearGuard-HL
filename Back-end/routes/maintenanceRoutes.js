const express = require("express");
const router = express.Router();
const maintenanceController = require("../controllers/maintenanceController");

router.get("/", maintenanceController.getCalendarData);
router.post("/", maintenanceController.createRequest);
router.get("/dashboard", maintenanceController.getDashboardData);
router.get("/", maintenanceController.getAllRequests);
router.get("/:id", maintenanceController.getRequestById);
router.patch("/:id", maintenanceController.updateRequestStatus);
module.exports = router;