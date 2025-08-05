import asyncHandler from 'express-async-handler';
import TodoList from '../models/TodoList.js';

export const getTodos = asyncHandler(async (req, res) => {
  const todos = await TodoList.find({ user: req.user._id });
  res.json(todos);
});

export const createTodoList = asyncHandler(async (req, res) => {
  const todo = new TodoList({
    name: req.body.name,
    user: req.user._id,
    items: [],
  });
  const created = await todo.save();
  res.status(201).json(created);
});

export const updateTodoList = asyncHandler(async (req, res) => {
  const todo = await TodoList.findById(req.params.id);
  if (todo && todo.user.equals(req.user._id)) {
    todo.name = req.body.name || todo.name;
    const updated = await todo.save();
    res.json(updated);
  } else {
    res.status(404);
    throw new Error('Todo list not found');
  }
});

export const deleteTodoList = asyncHandler(async (req, res) => {
  const todo = await TodoList.findById(req.params.id);
  if (todo && todo.user.equals(req.user._id)) {
    await TodoList.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo list removed' });
  } else {
    res.status(404);
    throw new Error('Todo list not found');
  }
});

export const addItem = asyncHandler(async (req, res) => {
  const todo = await TodoList.findById(req.params.id);
  if (todo && todo.user.equals(req.user._id)) {
    todo.items.push({ text: req.body.text });
    const updated = await todo.save();
    res.json(updated);
  } else {
    res.status(404);
    throw new Error('Todo list not found');
  }
});

export const updateItem = asyncHandler(async (req, res) => {
  const todo = await TodoList.findById(req.params.id);
  if (todo && todo.user.equals(req.user._id)) {
    const item = todo.items.id(req.params.itemId);
    if (item) {
      item.text = req.body.text ?? item.text;
      item.completed = req.body.completed ?? item.completed;
      await todo.save();
      res.json(todo);
    } else {
      res.status(404);
      throw new Error('Item not found');
    }
  } else {
    res.status(404);
    throw new Error('Todo list not found');
  }
});

export const deleteItem = asyncHandler(async (req, res) => {
  const { id, itemId } = req.params;

  const todo = await TodoList.findById(id);
  if (!todo || !todo.user.equals(req.user._id)) {
    res.status(404);
    throw new Error('Todo list not found');
  }

  const item = todo.items.id(itemId);
  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }

  item.deleteOne();
  await todo.save();
  res.json({ message: 'Item deleted' });
});