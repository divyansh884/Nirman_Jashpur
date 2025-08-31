const express = require("express");
const Ward = require("../models/subSchema/ward");

const router = express.Router();
const { auth, authorizeRole } = require("../middleware/auth");

// Create
router.post("/", auth, authorizeRole("Super Admin"), async (req, res) => {
  try {
    const doc = new Ward(req.body);
    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read all
router.get("/", async (req, res) => {
  const docs = await Ward.find();
  res.json(docs);
});

// Read one
router.get("/:id", async (req, res) => {
  try {
    const doc = await Ward.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update
router.put("/:id", auth, authorizeRole("Super Admin"), async (req, res) => {
  try {
    const doc = await Ward.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete
router.delete("/:id", auth, authorizeRole("Super Admin"), async (req, res) => {
  try {
    const doc = await Ward.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
