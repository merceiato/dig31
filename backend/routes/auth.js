// Auth routes
const express = require("express")
const router = express.Router()

// POST /auth/signin
router.post('/signin', (req, res) => {
    res.send("Auth > signin route!")
})

// GET /auth/validate 
router.get('/validate', ( req, res) => {
    res.send("Auth > validate route!")
})


module.exports = router