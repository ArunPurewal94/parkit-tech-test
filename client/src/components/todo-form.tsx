import React, { useState, useEffect } from "react";
import { format } from "date-fns";
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

      const date = new Date(editTodo.dueDate);

      setDueDate(format(date, "yyyy-MM-dd"));
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
    setEditTodo(null);
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mx-5">
        {editTodo ? "Edit Todo" : "Add Todo"}
      </h2>
      <form className="flex flex-col p-5 space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            required
            className="w-full border rounded mt-2 p-2"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            required
            className="w-full border rounded mt-2 p-2"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="dueDate">Due Date:</label>
          <input
            className="w-full border rounded mt-2 p-2"
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-5 mx-auto">
          <button
            className="py-2 px-6 bg-indigo-500 rounded text-white"
            type="submit"
          >
            {editTodo ? "Update" : "Add"}
          </button>
          <button
            className="py-2 px-4 bg-red-500 rounded text-white"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
