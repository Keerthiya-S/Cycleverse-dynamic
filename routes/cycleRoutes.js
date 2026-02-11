const express = require("express");
const router = express.Router();
const multer = require("multer");
const Cycle = require("../models/Cycle");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });


router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const newCycle = new Cycle({
      name: req.body.name,
      category: req.body.category,
      brand: req.body.brand,
      price: req.body.price,
      description: req.body.description,
      image: req.file ? req.file.filename : "",
      colors: req.body.colors
        ? req.body.colors.split(",").map(c => c.trim())
        : [],
      specs: req.body.specs
        ? req.body.specs.split(",").map(s => s.trim())
        : []
    });

    await newCycle.save();

    res.json({ message: "Cycle Added Successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const cycles = await Cycle.find().sort({ createdAt: -1 });
    res.json(cycles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/category/:category", async (req, res) => {
  try {
    const cycles = await Cycle.find({ category: req.params.category });
    res.json(cycles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/brand/:brand", async (req, res) => {
  try {

    const brandName = req.params.brand;

    const cycles = await Cycle.find({
      brand: { $regex: new RegExp("^" + brandName + "$", "i") }
    });

    res.json(cycles);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const cycle = await Cycle.findById(req.params.id);

    if (!cycle) {
      return res.status(404).json({ message: "Cycle not found" });
    }

    res.json(cycle);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.put("/update/:id", upload.single("image"), async (req, res) => {
  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const cycle = await Cycle.findById(req.params.id);
    if (!cycle) {
      return res.status(404).json({ message: "Cycle not found" });
    }

    
    if (req.file) {
      if (cycle.image) {
        const oldImagePath = path.join(uploadDir, cycle.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      cycle.image = req.file.filename;
    }

    cycle.name = req.body.name || cycle.name;
    cycle.category = req.body.category || cycle.category;
    cycle.brand = req.body.brand || cycle.brand;
    cycle.price = req.body.price || cycle.price;
    cycle.description = req.body.description || cycle.description;

    if (req.body.colors) {
      cycle.colors = req.body.colors.split(",").map(c => c.trim());
    }

    if (req.body.specs) {
      cycle.specs = req.body.specs.split(",").map(s => s.trim());
    }

    await cycle.save();

    res.json({ message: "Cycle Updated Successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete("/delete/:id", async (req, res) => {
  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const cycle = await Cycle.findById(req.params.id);
    if (!cycle) {
      return res.status(404).json({ message: "Cycle not found" });
    }

    if (cycle.image) {
      const imagePath = path.join(uploadDir, cycle.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Cycle.findByIdAndDelete(req.params.id);

    res.json({ message: "Cycle Deleted Successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
