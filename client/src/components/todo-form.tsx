import React, { useState, useEffect } from "react";
import axios from "axios";

import { useTodoStore } from "../store";

interface TodoFormProps {
  onCancel?: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onCancel }) => {
  const todoStore = useTodoStore();
  const { editTodo, setEditTodo } = todoStore;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    if (editTodo) {
      setTitle(editTodo.title);
      setDescription(editTodo.description);
      setDueDate(editTodo.dueDate);
      setStatus(editTodo.status);
    }
  }, [editTodo]);

  const handleSubmit = async () => {
    if (editTodo) {
      try {
        await axios.put(`http://localhost:4000/todos/${editTodo._id}`, {
          title,
          description,
          dueDate: new Date(dueDate).toISOString(),
          status,
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await axios.post("http://localhost:4000/todos", {
          title,
          description,
          dueDate,
          status,
        });
        setTitle("");
        setDescription("");
        setDueDate("");
        setStatus("pending");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }

    setTitle("");
    setDescription("");
    setDueDate("");
    setEditTodo(null); // Reset the editTodo state in the Zustand store
  };

  return (
    <div>
      <h2>{editTodo ? "Edit Todo" : "Add Todo"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <button type="submit">{editTodo ? "Update" : "Add"}</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
