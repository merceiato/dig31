// routes/user.js
import express from "express";
const router = express.Router();

// GET - get all users
router.get("/", (_req, res) => {
  res.send("Listing all users...");
});

export default router;
