import { create } from "zustand";
import { Todo } from "../types";

interface TodoStore {
  todos: Todo[];
  editTodo: Todo | null;
  showCompleted: boolean;
  setTodos: (todos: Todo[]) => void;
  setEditTodo: (todo: Todo | null) => void;
  setShowCompleted: (showCompleted: boolean) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  editTodo: null,
  showCompleted: false,
  setTodos: (todos) => set({ todos }),
  setEditTodo: (editTodo) => set({ editTodo }),
  setShowCompleted: (showCompleted) => set({ showCompleted }),
}));
