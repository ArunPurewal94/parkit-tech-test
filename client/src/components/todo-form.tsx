import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

interface Todo {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
}

interface TodoFormProps {
  todo?: Todo | null;
  onCancel?: () => void;
}

export const TodoForm = ({ todo = null, onCancel }: TodoFormProps) => {
  const [title, setTitle] = useState(todo ? todo.title : "");
  const [description, setDescription] = useState(todo ? todo.description : "");
  const [dueDate, setDueDate] = useState(todo ? todo.dueDate : "");
  const [status, setStatus] = useState(todo ? todo.status : "pending");

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setDueDate(format(new Date(todo.dueDate), "yyyy-MM-dd"));
    }
  }, [todo]);

  const handleSubmit = async () => {
    if (todo) {
      try {
        await axios.put(`http://localhost:4000/todos/${todo._id}`, {
          title,
          description,
          dueDate,
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
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <br />
      <input
        required
        id="title"
        type="text"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setTitle(e.target.value);
        }}
      />
      <br />
      <br />
      <label htmlFor="description">Description</label>
      <br />
      <textarea
        required
        id="description"
        value={description}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setDescription(e.target.value);
        }}
      />{" "}
      <br />
      <label htmlFor="dueDate">Due Date</label>
      <br />
      <input
        id="dueDate"
        type="date"
        value={dueDate}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setDueDate(e.target.value);
        }}
      />
      <br />
      <br />
      <br />
      <button>{todo ? "Edit Todo" : "Add Todo"}</button>
      {onCancel && (
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      )}
    </form>
  );
};
