import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { TodoForm } from "./todo-form";

export interface TodoProps {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  ordinal: number;
}

export const TodoList = () => {
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [editTodo, setEditTodo] = useState<TodoProps | null>(null);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await axios.get("http://localhost:4000/todos");
        const getTodo = response.data;

        setTodos(getTodo);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTodos();
  }, []);

  const handleDeleteTodo = async (todoId: string) => {
    try {
      await axios.delete(`http://localhost:4000/todos/${todoId}`);
      setTodos(todos.filter((todo) => todo._id !== todoId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleTodo = async (todoId: string, currentStatus: string) => {
    const newStatus = currentStatus === "completed" ? "pending" : "completed";
    try {
      await axios.put(`http://localhost:4000/todos/${todoId}`, {
        status: newStatus,
      });
      setTodos(
        todos.map((todo) =>
          todo._id === todoId ? { ...todo, status: newStatus } : todo
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditTodo = (todo: TodoProps) => {
    setEditTodo(todo);
  };

  const handleCancelEdit = () => {
    setEditTodo(null);
  };

  return (
    <div>
      {editTodo ? (
        <TodoForm todo={editTodo} onCancel={handleCancelEdit} />
      ) : (
        <TodoForm />
      )}
      {todos.map((todo) => (
        <Fragment key={todo._id}>
          <div>
            {todo.ordinal} - {todo.title}
          </div>
          <div>{todo.description}</div>
          <div>Due Date: {new Date(todo.dueDate).toLocaleDateString()}</div>
          <div>Status: {todo.status}</div>
          <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
          <button onClick={() => handleToggleTodo(todo._id, todo.status)}>
            {todo.status === "pending"
              ? "Mark as Completed"
              : "Mark as Pending"}
          </button>
          <button onClick={() => handleEditTodo(todo)}>Edit</button>
        </Fragment>
      ))}
    </div>
  );
};
