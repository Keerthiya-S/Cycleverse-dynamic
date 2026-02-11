const mongoose = require("mongoose");

const cycleSchema = new mongoose.Schema({
    name: String,
    category: String,   // mountain, road, electric, kids
    brand: String,      // trek, giant, cannondale, specialized
    price: String,
    description: String,
    image: String,
    colors: [String],
    specs: [String],
}, { timestamps: true });

module.exports = mongoose.model("Cycle", cycleSchema);
