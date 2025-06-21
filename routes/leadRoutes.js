const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");
const authenticate = require("./authMiddleware"); // ✅ Updated path

// Create a new lead (requires authentication)
router.post("/", authenticate, async (req, res) => {
    try {
        const lead = new Lead(req.body);
        await lead.save();
        res.status(201).json(lead);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all leads (requires authentication)
router.get("/", authenticate, async (req, res) => {
    try {
        const leads = await Lead.find();
        res.json(leads);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get lead by ID (requires authentication)
router.get("/:id", authenticate, async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);
        if (!lead) return res.status(404).json({ message: "Lead not found" });
        res.json(lead);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update lead (requires authentication)
router.put("/:id", authenticate, async (req, res) => {
    try {
        const updatedLead = await Lead.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
        );
        res.json(updatedLead);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete lead (requires authentication)
router.delete("/:id", authenticate, async (req, res) => {
    try {
        await Lead.findByIdAndDelete(req.params.id);
        res.json({ message: "Lead deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
