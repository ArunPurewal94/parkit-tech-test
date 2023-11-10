import { useEffect } from "react";
import axios from "axios";
import { useTodoStore } from "../store";
import { Todo } from "../types";
import { format } from "date-fns";

const TodoList = () => {
  const todoStore = useTodoStore();
  const { todos, setTodos, setEditTodo } = todoStore;

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:4000/todos");
        setTodos(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTodos();
  }, [setTodos]);

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

  const handleEditTodo = (todo: Todo) => {
    setEditTodo(todo);
  };

  return (
    <div>
      <h2>Todo List</h2>
      {todos.map((todo: Todo) => (
        <div key={todo._id}>
          <p>Title: {todo.title}</p>
          <p>Ordinal: {todo.ordinal}</p>
          <p>Description: {todo.description}</p>
          <p>Due Date: {format(new Date(todo.dueDate), "dd-MM-yyyy")}</p>
          <p>Status: {todo.status}</p>
          <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
          <button onClick={() => handleToggleTodo(todo._id, todo.status)}>
            Toggle Status
          </button>
          <button onClick={() => handleEditTodo(todo)}>Edit</button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
