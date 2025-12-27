const express = require("express");
const router = express.Router();
const { createRequest, getRequests, updateStatus } = require("../controllers/requestController");

router.post("/requests", createRequest);
router.get("/requests", getRequests);
router.patch("/requests/:id/status", updateStatus);

module.exports = router;