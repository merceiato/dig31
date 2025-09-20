//User routes
const express = require("express")
const router = express.Router()




// GET - get all users
router.get("/", (req, res) => {
  res.send("Listing all users...")
})

module.exports = router
