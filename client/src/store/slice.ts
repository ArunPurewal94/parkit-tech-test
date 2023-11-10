import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../types";
import axios from "axios";

interface TodoState {
  todos: Todo[];
  status: "completed" | "pending";
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  status: "pending",
  error: null,
};

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  try {
    const response = await axios.get("http://localhost:4000/todos");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch todos");
  }
});

const TodoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex(
        (todo) => todo._id === action.payload._id
      );
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "completed";
        state.todos = action.payload;
      });
  },
});

export const { addTodo, updateTodo, deleteTodo } = TodoSlice.actions;

export default TodoSlice.reducer;
