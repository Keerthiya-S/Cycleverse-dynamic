const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

/* =========================
   SEND CONTACT MESSAGE
========================= */
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


/* =========================
   GET ALL CONTACTS (ADMIN)
========================= */
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching contacts" });
  }
});


/* =========================
   DELETE CONTACT (ADMIN)
========================= */
router.delete("/delete/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;