const express = require("express");
const router = express.Router();
const {
  checkEmail,
  resetPassword
} = require("../controllers/forgotcontrollers");

router.post("/check-email", checkEmail);
router.post("/reset-password", resetPassword);

module.exports = router;
