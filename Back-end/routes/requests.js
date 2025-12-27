const express = require("express");
const router = express.Router();

// Example: Mongo / SQL code goes inside here
router.put("/status/:id", async (req, res) => {
  try {
    const { status } = req.body;

    // Update request in DB here
    console.log("Updating:", req.params.id, "to", status);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
