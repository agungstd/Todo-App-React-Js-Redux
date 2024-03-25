import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTodos } from "../features/TotoSlice.js";
import TodoItem from "./TodoItem.jsx";

const TodoList = () => {
  const todos = useSelector((state) => state.todos.data);
  const loading = useSelector((state) => state.todos.loading);
  const error = useSelector((state) => state.todos.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTodos());
  }, [dispatch]);

  return (
    <ul>
      <li className="my-2 text-sm italic">All Your Notes Here...</li>
      {loading && <li>Loading...</li>}
      {error && <li>{error}</li>}
      {todos &&
        todos.map((todo, index) => (
          <TodoItem key={todo.id} todo={todo} index={index} />
        ))}
    </ul>
  );
};

export default TodoList;
