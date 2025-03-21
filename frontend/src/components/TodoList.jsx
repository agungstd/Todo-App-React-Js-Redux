import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTodos } from "../features/TotoSlice.js";
import TodoItem from "./TodoItem.jsx";

const TodoList = () => {
  const todos = useSelector((state) => state.todos.data);
  const loading = useSelector((state) => state.todos.loading);
  const error = useSelector((state) => state.todos.error);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    dispatch(getAllTodos());
  }, [dispatch]);

  const filteredTodos = todos ? todos.filter(todo => {
    if (filter === "active") return parseInt(todo.completed) === 0;
    if (filter === "completed") return parseInt(todo.completed) === 1;
    return true;
  }) : [];

  const completedCount = todos ? todos.filter(todo => parseInt(todo.completed) === 1).length : 0;
  const activeCount = todos ? todos.length - completedCount : 0;

  return (
    <div className="todo-list-container">
      {todos && todos.length > 0 && (
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-600">
            <span className="font-medium">{activeCount}</span> active, 
            <span className="font-medium ml-1">{completedCount}</span> completed
          </div>
          <div className="filter-buttons">
            <button 
              className={`px-2 py-1 text-sm rounded mr-1 ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button 
              className={`px-2 py-1 text-sm rounded mr-1 ${filter === "active" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => setFilter("active")}
            >
              Active
            </button>
            <button 
              className={`px-2 py-1 text-sm rounded ${filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
          </div>
        </div>
      )}

      <ul className="todo-list">
        <li className="my-2 text-sm italic">All Your Notes Here...</li>
        {loading && <li className="py-4 text-center">Loading...</li>}
        {error && <li className="py-4 text-center text-red-500">{error}</li>}
        
        {!loading && !error && todos && todos.length === 0 && (
          <li className="py-8 text-center text-gray-500">
            <p>No todos yet! Add your first todo above.</p>
          </li>
        )}
        
        {!loading && !error && filteredTodos.length === 0 && todos.length > 0 && (
          <li className="py-8 text-center text-gray-500">
            <p>No {filter} todos found.</p>
          </li>
        )}
        
        {filteredTodos &&
          filteredTodos.map((todo, index) => (
            <TodoItem key={todo.id} todo={todo} index={index} />
          ))}
      </ul>
    </div>
  );
};

export default TodoList;