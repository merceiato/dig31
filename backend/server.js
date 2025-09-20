// backend/server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user.js";


dotenv.config();

const app = express();
app.use(cors());                 // helpful when you build the SPA later
app.use(express.json());         // replaces body-parser per course notes

const { MONGODB_URI, PORT = 5000 } = process.env;

if (!MONGODB_URI) {
  console.error("Missing MONGODB_URI in .env");
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });


//routes

// homepage
app.get("/", (_req, res) => {
  res.status(200).json({ msg: "DIG31 backend up 🚀" });
});


//user
app.use('/user', userRouter)


// TODO: In Exercise 2C you’ll split routes:
// app.use("/user", userRouter)
// app.use("/auth", authRouter)

app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));

