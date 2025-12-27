const express = require("express");
const router = express.Router();

const {
  getWorkCenters,
  getSingleWorkCenter
} = require("../controllers/workCenterController");

router.get("/workcenters", getWorkCenters);
router.get("/workcenters/:id", getSingleWorkCenter);

module.exports = router;
