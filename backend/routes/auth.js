// Auth routes
// dependencies
require("dotenv").config()
const express = require("express")
const router = express.Router()
const User = require("../models/User")
const Utils = require("../Utils")
const jwt = require("jsonwebtoken");


// POST /auth/signin -------------------------------------------------
router.post('/signin', (req, res) => {
  // 1. validate request (email and password)
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      message: "Please provide email and password"
    });
  }

  // 2. find user in database
  User.findOne({ email: req.body.email })
    .then(user => {
      // if user doesn't exist
      if (user == null) {
        return res.status(400).json({
          message: "Account doesn't exist"
        });
      }

    //   // 3. user exists > verify password
    //     console.log("DB password:", user.password);
    //     console.log("Entered password:", req.body.password);
    //     console.log("Verify result:", Utils.verifyPassword(req.body.password, user.password));

      if (Utils.verifyPassword(req.body.password, user.password)) {
        // 4. password verified > create user object
        const userObject = {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        };

        // 5. generate accessToken > Utils.generateAccessToken()
        const accessToken = Utils.generateAccessToken(userObject);

        // 6. send back response with accessToken and user object
        res.json({
          accessToken: accessToken,
          user: userObject
        });
      } else {
        // password doesn't match
        // send back error
        return res.status(400).json({
          message: "Password / Email incorrect"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "problem signing in",
        error: err
      });
    });
});



// GET /auth/validate ----------------------
router.get('/validate', (req, res) => {
  // get token from header (handle missing header safely)
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401); // Unauthorized if no token
  }

  // validate the token using jwt.verify()
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, tokenData) => {
    if (err) {
      // token invalid
      return res.sendStatus(403); // Forbidden
    }

    // token must be valid!
    // send back the tokenData (decrypted payload) as response
    res.json(tokenData);
  });
});



module.exports = router