const express = require("express");
const app = express();
const cors = require("cors");
const mongo = require("mongoose");
const connectWithDB = require("./config/database");
const Todo = require("./model/Todo");
require('dotenv').config()

connectWithDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/todos", async function (req, res) {
  const todo = await Todo.find();
  res.status(200).json({
    success:true,
    todo
  });
});

app.post("/todos/new", async function (req, res) {
  const todos = req.body;
  const todo =  new Todo({
    text:todos.newTodo,
  })
 const savedTodo = await todo.save({validateBeforeSave:false})
  res.status(200).json({
    success: true,
    savedTodo,
  });
});

app.put("/todos/update/:id", async function (req, res) {
  const todo = await Todo.findById(req.params.id);
  todo.text = req.body.text;
  todo.save();
  res.json(todo);
});

app.delete("/todos/delete/:id", async function (req, res) {
  const result = await Todo.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success:true,
    result
  })
});

app.get("/todos/complete/:id", async function (req, res) {
  const todo = await Todo.findById(req.params.id);
  todo.complete = !todo.complete;
  res.status(200).json({
    success:true,
    todo
  });
});

app.listen(process.env.PORT);
