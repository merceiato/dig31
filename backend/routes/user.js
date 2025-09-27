// User routes
const express = require("express")
const router = express.Router()
const User = require("./../models/User")
const Utils = require("../Utils")

// GET - get all users ---------------------------------------------------------------------------------
router.get("/", async (req, res) => {
  // get all users from the User model, using the find() method
  User.find()
    //filtering values
    //User.find({firstname: "David", accessLevel: 3})
    .then((users) => {
      res.json(users)
    })
    .catch((err) => {
      console.log("error getting user", err)
      res.status(500).json({
        message: "problem getting user",
        error: err,
      })
    })
})

// GET - get a single user by id -----------------------------------------------------------------------
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "user doesn't exist",
        })
      } else {
        res.json(user)
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "error getting user" })
    })
})

// POST - create new user ------------------------------------------------------
router.post("/", (req, res) => {
  // check if the req.body is empty, if so – send back error
  if (!req.body) {
    return res.status(400).json({
      message: "user content is empty!",
    })
  }


  User.findOne({ email: req.body.email })
  .then(user => {
    if (user != null) {
      return res.status(400).json({
        message: "email already in use"
      })
    }
  // create a new user document using the User model
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    accessLevel: req.body.accessLevel,
    password: req.body.password,
  })

  // save newUser document to the database
  newUser
    .save()
    .then((user) => {
      res.status(201).json(user)
    })
    .catch((err) => {
      console.log("error creating user", err)
      res.status(500).json({
        message: "problem creating user",
        error: err,
      })
    })
    
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      message: "problem creating account"
    })
  })

})

// PUT - update user by id ==================================================
// endpoint = /user/:id
router.put("/:id", (req, res) => {
  // check if the req.body is empty, if so – send back error
  if (!req.body) {
    return res.status(400).json({
      message: "user content is empty!",
    })
  }

  // update user using the User model
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((user) => {
      res.json(user)
    })
    .catch((err) => {
      console.log("error updating user", err)
      // send back 500 status with error message
      res.status(500).json({
        message: "problem updating user",
        error: err,
      })
    })
})

// DELETE - delete user by id
// endpoint = /user/:id
router.delete("/:id", (req, res) => {
  // validate the request (make sure id isn't missing)
  if (!req.params.id) {
    return res.status(400).json({
      message: "user id is missing!",
    })
  }

  // delete the user using the User model
  User.findOneAndDelete({ _id: req.params.id })
    .then(() => {
      res.json({
        message: "User deleted",
      })
    })
    .catch((err) => {
      console.log("error deleting user", err)
      // send back 500 status with error message
      res.status(500).json({
        message: "problem deleting user",
        error: err,
      })
    })
})

module.exports = router
