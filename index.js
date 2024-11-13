const express = require("express")
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const todoRoutes = require("./routes/todoRoutes")
const userRoutes = require("./routes/userRoutes")
const cors = require("cors")
require("dotenv").config()

const app = express()

app.use(express.json())
app.use(cors())
connectDB()

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/todos", todoRoutes)
app.use("/api/users", userRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  })
})
