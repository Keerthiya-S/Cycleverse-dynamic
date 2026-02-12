const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Create Order
router.post("/", async (req, res) => {
    try {

        const {
            products,
            totalAmount,
            customerName,
            phone,
            address,
            city,
            zip
        } = req.body;

        if (!products || products.length === 0) {
            return res.status(400).json({ message: "No products in order" });
        }

        const newOrder = new Order({
            products,
            totalAmount,
            customerName,
            phone,
            address,
            city,
            zip
        });

        await newOrder.save();

        res.status(201).json({ message: "Order placed successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error placing order" });
    }
});


// Get All Orders (For Dashboard)
router.get("/", async (req, res) => {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
});

module.exports = router;
