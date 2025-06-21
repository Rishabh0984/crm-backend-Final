const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: String,
    phone: String,
    company: String,
    status: { type: String, default: "New" },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Lead", leadSchema);
