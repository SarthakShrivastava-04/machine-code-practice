import { todos } from '../data.js';

export const getTodos = (req, res) => {
  const userTodos = todos.filter(todo => todo.userId === req.user.id);
  res.json(userTodos);
};

export const addTodo = (req, res) => {
  const newTodo = {
    id: Date.now(),
    text: req.body.text,
    userId: req.user.id,
    completed: false
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
};

export const deleteTodo = (req, res) => {
  const index = todos.findIndex(
    todo => todo.id === parseInt(req.params.id) && todo.userId === req.user.id
  );
  if (index === -1) return res.status(404).json({ msg: 'Todo not found' });

  const deleted = todos.splice(index, 1);
  res.json(deleted[0]);
};

export const updateTodo = (req, res) => {
  const index = todos.findIndex(
    todo => todo.id === parseInt(req.params.id) && todo.userId === req.user.id
  );
  if (index === -1) return res.status(404).json({ msg: 'Todo not found' });

  const updatedTodo = {
    ...todos[index],
    text: req.body.text,
    completed: req.body.completed ?? todos[index].completed
  };
  todos[index] = updatedTodo;
  res.json(updatedTodo);
};

export const patchTodo = (req, res) => {
  const todo = todos.find(
    todo => todo.id === parseInt(req.params.id) && todo.userId === req.user.id
  );
  if (!todo) return res.status(404).json({ msg: 'Todo not found' });

  if (req.body.text !== undefined) todo.text = req.body.text;
  if (req.body.completed !== undefined) todo.completed = req.body.completed;

  res.json(todo);
};
