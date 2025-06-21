const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
    type: { type: String, required: true }, // e.g., Call, Email, Meeting
    description: String,
    lead: { type: mongoose.Schema.Types.ObjectId, ref: "Lead", required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Activity", activitySchema);
