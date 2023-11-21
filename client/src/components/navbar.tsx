import { useTodoStore } from "../store";

export const Navbar = () => {
  const todoStore = useTodoStore();
  const { showCompleted, setShowCompleted } = todoStore;
  return (
    <nav className="p-5 flex items-center justify-between shadow border-b mb-5">
      <a href="/" className="cursor-pointer">
        ParkIT Tech Test
      </a>
      <span
        className="cursor-pointer hover:opacity-75"
        onClick={() => setShowCompleted(!showCompleted)}
      >
        {showCompleted ? "Pending Todos" : "Completed Todos"}
      </span>
    </nav>
  );
};
