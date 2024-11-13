const Todo = require("../models/todo")

const VALID_STATUSES = ["done", "pending", "in progress", "completed"]

exports.createTodo = async (req, res) => {
  if (!VALID_STATUSES.includes(req.body.status)) {
    return res.status(400).json({ error: "Invalid status" })
  }

  try {
    const todo = await Todo.create({ ...req.body, userId: req.user.id })
    res.status(201).json(todo)
  } catch (error) {
    res.status(400).json({ error: "Todo creation failed" })
  }
}

exports.updateTodo = async (req, res) => {
  const { id } = req.params
  const updates = req.body
  console.log({ updates })

  if (updates.status && !VALID_STATUSES.includes(updates.status)) {
    return res.status(400).json({ error: "Invalid status update" })
  }

  try {
    const todo = await Todo.findOneAndUpdate({ _id: id, userId: req.user.id }, updates, { new: true })

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" })
    }

    res.json(todo)
  } catch (error) {
    res.status(400).json({ error: "Todo update failed" })
  }
}

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user.id })

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" })
    }

    res.json({ message: "Todo deleted" })
  } catch (error) {
    res.status(400).json({ error: "Todo deletion failed" })
  }
}

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id })
    res.json(todos)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" })
  }
}
