import { Navbar } from "./components/navbar";
import TodoForm from "./components/todo-form";
import TodoList from "./components/todo-list";

function App() {
  return (
    <>
      <Navbar />
      <TodoForm />
      <TodoList />
    </>
  );
}

export default App;
