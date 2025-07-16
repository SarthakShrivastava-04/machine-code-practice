import express from 'express';
import {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  patchTodo
} from '../controllers/todoController.js';

const router = express.Router();

// router.use(auth);

router.get('/', getTodos);
router.post('/', addTodo);
router.delete('/:id', deleteTodo);
router.put('/:id', updateTodo);
router.patch('/:id', patchTodo);

export default router;
