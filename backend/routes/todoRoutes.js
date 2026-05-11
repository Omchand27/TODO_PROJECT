const express = require("express");
const Todo = require("../models/Todo");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get Todos
router.get("/", authMiddleware, async (req, res) => {
  const todos = await Todo.find({ user: req.user });
  res.json(todos);
});

// Create Todo
router.post("/", authMiddleware, async (req, res) => {
  const todo = await Todo.create({
    title: req.body.title,
    user: req.user,
  });

  res.json(todo);
});

// Update Todo
router.put("/:id", authMiddleware, async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
    },
    { new: true }
  );

  res.json(todo);
});

// Delete Todo
router.delete("/:id", authMiddleware, async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);

  res.json({ message: "Todo deleted" });
});

module.exports = router;