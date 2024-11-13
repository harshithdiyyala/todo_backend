const express = require("express")
const { createTodo, getTodos, updateTodo, deleteTodo } = require("../controllers/todoController")
const authMiddleware = require("../middleware/authMiddleware")
const router = express.Router()

router.use(authMiddleware)

router.post("/", createTodo)
router.get("/", getTodos)
router.put("/:id", updateTodo)
router.delete("/:id", deleteTodo)

module.exports = router
