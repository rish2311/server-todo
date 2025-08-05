import mongoose from 'mongoose';

const todoItemSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const todoListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [todoItemSchema],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const TodoList = mongoose.model('TodoList', todoListSchema);
export default TodoList;