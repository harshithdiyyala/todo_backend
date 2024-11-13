const jwt = require("jsonwebtoken")
require("dotenv").config()

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]
  if (!token) return res.status(401).json({ error: "Unauthorized access" })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired, please log in again" })
    }
    res.status(401).json({ error: "Invalid token" })
  }
}

module.exports = authMiddleware
