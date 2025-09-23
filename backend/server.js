//dependencies--------------------------------------------------
require("dotenv").config()
const bodyParser=require("body-parser")
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const port = process.env.PORT || 3000

// database connection --------------------------------------------------
const uri = process.env.MONGODB_URI;     
const dbName = process.env.MONGODB_DB;   

mongoose.connect(uri, { dbName })        
  .then(() => console.log("db connected!"))
  .catch((err) => console.error("db connection failed!", err.message));

//express app setup 
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('*',cors())


//routes--------------------------------------------------
//homepage
app.get('/', (req,res) => {
  res.send("This is the homepage")
})

//user
const userRouter = require("./routes/user")
app.use('/user', userRouter)

//auth
const authRouter = require("./routes/auth")
app.use('/auth', authRouter)

//run app (listen on port)--------------------------------------------------
app.listen(port, () => {
  console.log ("App is running on port", port)
})