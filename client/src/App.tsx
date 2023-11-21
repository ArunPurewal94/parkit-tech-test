import { Navbar } from "./components/navbar";
import TodoForm from "./components/todo-form";
import TodoList from "./components/todo-list";
import { useTodoStore } from "./store";

function App() {
  const todoStore = useTodoStore();
  const { showCompleted } = todoStore;

  return (
    <>
      <Navbar />
      {!showCompleted && <TodoForm />}
      <TodoList />
    </>
  );
}

export default App;
