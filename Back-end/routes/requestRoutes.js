const express = require("express");
const router = express.Router();

const detailController = require("../controllers/requestDetailController");

router.get("/:id", detailController.getTestActivityDetail);
router.patch("/:id",detailController.updateRequestStatus);

module.exports = router;