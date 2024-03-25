import PropTypes from "prop-types";
import {
  FaToggleOn,
  FaToggleOff,
  FaTrash,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "../features/TotoSlice.js";

const TodoItem = ({ todo, index }) => {
  let completed = parseInt(todo.completed);
  const dispatch = useDispatch();

  const markCompleted = (todo) => {
    if (todo.completed == 0) {
      dispatch(
        updateTodo({
          id: todo.id,
          title: todo.title,
          completed: 1,
          date: todo.date,
          updated: Date.now(),
        })
      );
    } else {
      dispatch(
        updateTodo({
          id: todo.id,
          title: todo.title,
          completed: 0,
          date: todo.date,
          updated: Date.now(),
        })
      );
    }
  };
  return (
    <li className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 py-2 gap-4">
      <div className="flex items-center">
        <span className="mr-4 text-gray-500">{index + 1}.</span>
        <span
          className={`mr-4 ${completed ? "line-through text-gray-500" : ""}`}
        >
          <span className="text-lg">{todo.title}</span>
          <p className="text-gray-500 text-sm italic">
            created : {new Date(parseInt(todo.date)).toLocaleString("id-ID")} |
            updated : {new Date(parseInt(todo.updated)).toLocaleString("id-ID")}
          </p>
        </span>
      </div>
      <div className="space-x-3 ml-8">
        <button
          className="mr-2 text-sm bg-blue-500 text-white sm:px-2 px-1 py-1 rounded"
          onClick={() => markCompleted(todo)}
        >
          {completed ? <FaToggleOff /> : <FaToggleOn />}
        </button>
        <button
          className="mr-2 text-sm bg-red-500 text-white sm:px-2 px-1 py-1 rounded"
          onClick={() => dispatch(removeTodo(todo.id))}
        >
          <FaTrash />
        </button>
        {!completed ? (
          <button
            className="text-sm bg-green-500 text-white sm:px-2 px-1 py-1 rounded"
            onClick={() => markCompleted(todo)}
          >
            <FaCheck />
          </button>
        ) : (
          ""
        )}
        {completed ? (
          <button
            className="text-sm bg-yellow-500 text-white sm:px-2 px-1 py-1 rounded"
            onClick={() => markCompleted(todo)}
          >
            <FaTimes />
          </button>
        ) : (
          ""
        )}
      </div>
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default TodoItem;
