const User = require("../models/user")
const bcrypt = require("bcrypt")

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile" })
  }
}

exports.updateProfile = async (req, res) => {
  const { name, email, password } = req.body

  try {
    const updates = { name }

    if (email) {
      const existingUser = await User.findOne({ email })
      if (existingUser && existingUser._id.toString() !== req.user.id) {
        return res.status(400).json({ error: "Email is already in use" })
      }
      updates.email = email
    }

    if (password) {
      updates.password = await bcrypt.hash(password, 10)
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select("-password")
    res.json(updatedUser)
  } catch (error) {
    res.status(400).json({ error: "Profile update failed" })
  }
}
