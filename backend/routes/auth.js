// Auth routes
// dependencies
const express = require("express")
const router = express.Router()
const User = require("../models/User")
const Utils = require("../Utils")

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

      // 3. user exists > verify password
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

module.exports = router