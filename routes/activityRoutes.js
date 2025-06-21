const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity");
const authMiddleware = require("./authMiddleware");

// 🔐 All routes are protected
router.use(authMiddleware);

// ➕ Create Activity
router.post("/", async (req, res) => {
    try {
        const { type, description, lead } = req.body;
        const activity = new Activity({
            type,
            description,
            lead,
            createdBy: req.user.id,
        });
        await activity.save();
        res.status(201).json(activity);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 📄 Get all Activities for a Lead
router.get("/lead/:leadId", async (req, res) => {
    try {
        const activities = await Activity.find({ lead: req.params.leadId }).populate("createdBy", "email");
        res.json(activities);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
