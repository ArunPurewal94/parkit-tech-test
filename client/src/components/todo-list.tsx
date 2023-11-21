import { useEffect } from "react";
import axios from "axios";
import { useTodoStore } from "../store";
import { Todo } from "../types";
import { format } from "date-fns";

const TodoList = () => {
  const todoStore = useTodoStore();
  const { todos, setTodos, setEditTodo, showCompleted } = todoStore;

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

  const pendingTodos = todos.filter((todo) => todo.status === "pending");
  const completedTodos = todos.filter((todo) => todo.status === "completed");

  const renderTodos = (todos: Todo[]) =>
    todos.map((todo: Todo) => (
      <div
        className="w-full  bg-white border border-gray-200 rounded-lg shadow p-5 mt-5 gap-3"
        key={todo._id}
      >
        <div className="flex flex-col items-center pb-10">
          <h5 className="mb-1 text-xl font-medium text-gray-900">
            {todo.ordinal} - {todo.title}
          </h5>
          <span className="text-sm text-gray-500">
            Due Date: {format(new Date(todo.dueDate), "dd-MM-yyyy")}
          </span>
          <div className="flex mt-4 md:mt-6">
            <button
              onClick={() => handleDeleteTodo(todo._id)}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300"
            >
              Delete
            </button>
            <button
              onClick={() => handleToggleTodo(todo._id, todo.status)}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 ms-3"
            >
              {todo.status === "pending"
                ? "Mark as completed"
                : "Mark as pending"}
            </button>
            {todo.status === "pending" && (
              <button
                onClick={() => handleEditTodo(todo)}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ms-3"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    ));

  return (
    <div>
      {!showCompleted && (
        <>
          <h2 className="text-center text-xl font-semibold">Pending Todos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-3 w-full gap-4">
            {renderTodos(pendingTodos)}
          </div>
        </>
      )}
      {showCompleted && (
        <>
          <h2 className="text-center text-xl font-semibold">Completed Todos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-3 w-full gap-4">
            {renderTodos(completedTodos)}
          </div>
        </>
      )}
    </div>
  );
};

export default TodoList;
