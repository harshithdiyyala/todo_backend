const mongoose = require("mongoose")
const { v4: uuidv4 } = require("uuid")

const todoSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  description: String,
  status: { type: String, enum: ["done", "pending", "in progress", "completed"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
})
todoSchema.index({ userId: 1 })

module.exports = mongoose.model("Todo", todoSchema)
