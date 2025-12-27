const express = require("express");
const router = express.Router();
const { createRequest, getRequests, updateRequestStatus } = require("../controllers/requestController");

router.post("/requests", createRequest);
router.get("/requests", getRequests);
router.patch("/requests/:id/status", updateRequestStatus);

module.exports = router;