const express = require("express");
const router = express.Router();
const eqController = require("../controllers/equipmentController");

router.get("/", eqController.getAllEquipment);
router.post("/bulk", eqController.bulkCreateEquipment);

module.exports = router;