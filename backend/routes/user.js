// User routes
const express = require("express")
const router = express.Router()
const User = require("./../models/User")

// GET - get all users ---------------------------------------------------------------------------------
router.get("/", async (req, res) => {
    // get all users from the User model, using the find() method
    User.find()
    //filtering values
   //User.find({firstname: "David", accessLevel: 3})
    .then((users) =>{
        res.json(users)
    })  
    .catch(()=> {
        console.log("problem getting users", err)
    })

   // GET - get a single user by id -----------------------------------------------------------------------
   //endpoint = /user/:id
   //Charlie Chaplin id =  68b988eeac33060f874b1fe6
    router.get("/:id", (req, res) => {
    console.log("[user/:id] param =", req.params.id)
    //res.send(`get single user with id = ${req.params.id}`)
})
   
    
})

module.exports = router
