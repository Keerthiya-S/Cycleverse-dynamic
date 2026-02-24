const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber");

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    // Email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ message: "Valid email is required." });
    }

    // Check duplicate
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already subscribed." });
    }

    // Save
    await Subscriber.create({ email });

    res.status(201).json({ message: "Successfully subscribed! 🎉" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;