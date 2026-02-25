const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber");

/* =========================
   SUBSCRIBE (FRONTEND)
========================= */
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ message: "Valid email is required." });
    }

    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already subscribed." });
    }

    await Subscriber.create({ email });

    res.status(201).json({ message: "Successfully subscribed! 🎉" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
});


/* =========================
   GET ALL SUBSCRIBERS (ADMIN)
========================= */
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching subscribers" });
  }
});


/* =========================
   DELETE SUBSCRIBER (ADMIN)
========================= */
router.delete("/delete/:id", async (req, res) => {
  try {
    await Subscriber.findByIdAndDelete(req.params.id);
    res.json({ message: "Subscriber deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;