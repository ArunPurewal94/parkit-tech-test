import { create } from "zustand";
import { Todo } from "../types";

interface TodoStore {
  todos: Todo[];
  editTodo: Todo | null;
  setTodos: (todos: Todo[]) => void;
  setEditTodo: (todo: Todo | null) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  editTodo: null,
  setTodos: (todos) => set({ todos }),
  setEditTodo: (editTodo) => set({ editTodo }),
}));
