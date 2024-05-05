const asyncHandler = require("express-async-handler");
const Todo = require("../models/todoModel");
//@desc Get all todos
//@route GET /api/todos
//@access private
const getTodos = asyncHandler(async (req, res) => {
    const todo = await Todo.find({user_id: req.user.id});
  res.status(200).json(todo);
});

//@desc create new todos
//@route POST /api/todos
//@access private
const createTodo = asyncHandler(async (req, res) => {
  console.log("the req body is: ", req.body);
  const { name, todo, time } = req.body;
  if (!name || !todo || !time) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const todos = await Todo.create({
    name,
    todo,
    time,
    user_id: req.user.id,
  });
  res.status(201).json(todos);
});

//@desc get todos
//@route GET /api/todos/:id
//@access private
const getTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(404);
    throw new Error("NO Todo");
  }

  res.status(200).json(todo);
});

//@desc update todos
//@route PUT /api/todos/:id
//@access private
const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(404);
    throw new Error("NO Todo");
  }

  
  if (todo.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }

  const updatedTodo = await Todo.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );


  res.status(200).json(updatedTodo);
});

//@desc delete todos
//@route DELETE /api/todos/:id
//@access private
const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(404);
    throw new Error("NO Todo");
  }
  
  if (todo.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }
  await Todo.deleteOne({ _id: req.params.id });
  res.status(200).json(todo);
});

module.exports = {
  getTodos,
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
};
