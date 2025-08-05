import express from 'express';
import { body } from 'express-validator';
import {
  getTodos,
  createTodoList,
  updateTodoList,
  deleteTodoList,
  addItem,
  updateItem,
  deleteItem
} from '../controllers/todoController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';

const todoRouter = express.Router();

todoRouter.use(protect);

todoRouter.route('/')
  .get(getTodos)
  .post(
    [body('name').notEmpty().withMessage('List name is required')],
    validateRequest,
    createTodoList
  );

todoRouter.route('/:id')
  .put(
    [body('name').notEmpty().withMessage('List name is required')],
    validateRequest,
    updateTodoList
  )
  .delete(deleteTodoList);

todoRouter.route('/:id/items')
  .post(
    [body('text').notEmpty().withMessage('Item text is required')],
    validateRequest,
    addItem
  );

todoRouter.route('/:id/items/:itemId')
  .put(updateItem)
  .delete(deleteItem);

export default todoRouter;
