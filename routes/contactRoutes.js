const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    await Contact.create({
      name,
      email,
      subject,
      message
    });

    res.status(201).json({ message: "Message sent successfully! 🚀" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;