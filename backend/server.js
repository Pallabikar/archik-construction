import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import productRoute from "./routes/products.js"
import mongoose from "mongoose";


dotenv.config()
connectDB()


const app = express()

app.use(cors())
app.use(express.json())


app.get("/", (req, res) => {
  res.send("Archik Backend is running 🚀")
})

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected ✅"))
.catch((err) => console.log("MongoDB connection error:", err));

import healthRoute from "./routes/health.js"
app.use("/api/health", healthRoute)

app.use("/api/products", productRoute);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`)
})
