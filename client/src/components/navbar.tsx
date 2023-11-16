import { useTodoStore } from "../store";

export const Navbar = () => {
  const todoStore = useTodoStore();
  const { showCompleted, setShowCompleted } = todoStore;
  return (
    <nav className="p-5 flex items-center justify-between shadow border-b mb-5">
      <div>ParkIT Tech Test</div>
      <div className="flex items-center gap-4">
        <span onClick={() => setShowCompleted(!showCompleted)}>
          {showCompleted ? "Pending Todos" : "Completed Todos"}
        </span>
        <span>Add Todo</span>
      </div>
    </nav>
  );
};
