const express = require("express");
const router = express.Router();

const {
  createRequest,
  getRequests
} = require("../controllers/requestController");

router.post("/requests", createRequest);
router.get("/requests", getRequests);

module.exports = router;
