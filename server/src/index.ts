import express, { Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import Todo from "./models/todo";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const PORT = 4000;

app.get("/todos", async (req: Request, res: Response) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todos", async (req: Request, res: Response) => {
  const count = await Todo.countDocuments();
  const newTodo = new Todo({
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate,
    ordinal: count + 1,
    status: req.body.status,
  });

  const createdTodo = await newTodo.save();
  res.json(createdTodo);
});

app.put("/todos/:todoId", async (req: Request, res: Response) => {
  const todoId = req.params.todoId;
  const updatedTodo = await Todo.findByIdAndUpdate(
    todoId,
    {
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
      status: req.body.status,
    },
    { new: true }
  );
  res.json(updatedTodo);
});

app.delete("/todos/:todoId", async (req: Request, res: Response) => {
  const todoId = req.params.todoId;
  const todo = await Todo.findByIdAndDelete(todoId);
  res.json(todo);
});

mongoose.connect(process.env.MONGO_URL as string).then(() => {
  console.log("MongoDB Connected");
  app.listen(PORT);
  console.log(`App is listening on Port: ${PORT}`);
});
