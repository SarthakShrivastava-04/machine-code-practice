import express from "express";
import Todo from "../models/Todo";

const router = express.Router();

router.use(protect);

router.get("/", async (req, res) => {
  const todos = await Todo.find({ userId: req.userId });
  res.json(todos);
});

router.post("/", async (req, res) => {
  const { text } = req.body;
  const todo = await Todo.create({ text, userId: req.userId });

  res.status(201).json(todo);
});

router.put("/:id", async (req, res) => {
  const todo = await Todo.findOne({
    _id: req.params.id,
    userId: req.userId,
  });

  todo.text = req.body.text ?? todo.text;
  todo.completed = req.body.completed ?? todo.completed;
  await todo.save();

  res.json(todo);
});

router.delete("/:id", async (req, res) => {
  const todo = await Todo.findOneAndDelete({
    _id: req.params.id,
    userId: req.userId,
  });
  if (!todo) return res.status(400).json({ message: "invalid data" });
  res.json({ message: "Deleted successfully" });
});

export default router;
