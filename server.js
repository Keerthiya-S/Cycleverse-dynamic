const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express(); 
app.use(express.static("public"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));


mongoose.connect("mongodb://127.0.0.1:27017/cycleverse")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const cycleRoutes = require("./routes/cycleRoutes");
app.use("/api/cycles", cycleRoutes);

const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);

app.listen(5000, () => {
    console.log("Server running at http://localhost:5000");
});
