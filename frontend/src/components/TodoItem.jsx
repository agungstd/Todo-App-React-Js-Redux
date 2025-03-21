import PropTypes from "prop-types";
import {
  FaToggleOn,
  FaToggleOff,
  FaTrash,
  FaCheck,
  FaTimes,
  FaEdit,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "../features/TotoSlice.js";
import { useState } from "react";

const TodoItem = ({ todo, index }) => {
  let completed = parseInt(todo.completed);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (editedTitle.trim()) {
      dispatch(
        updateTodo({
          id: todo.id,
          title: editedTitle,
          completed: todo.completed,
          date: todo.date,
          updated: Date.now(),
        })
      );
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedTitle(todo.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  return (
    <li className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 py-2 gap-4 hover:bg-gray-50 transition-colors duration-200">
      <div className="flex items-center flex-1">
        <span className="mr-4 text-gray-500">{index + 1}.</span>
        {isEditing ? (
          <div className="flex-1 mr-4">
            <input
              type="text"
              className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <div className="flex gap-2 mt-1">
              <button
                className="text-xs bg-green-500 text-white px-2 py-1 rounded"
                onClick={handleSaveEdit}
              >
                Save
              </button>
              <button
                className="text-xs bg-gray-500 text-white px-2 py-1 rounded"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <span
            className={`mr-4 ${completed ? "line-through text-gray-500" : ""}`}
          >
            <span className="text-lg">{todo.title}</span>
            <p className="text-gray-500 text-sm italic">
              created : {new Date(parseInt(todo.date)).toLocaleString("id-ID")} |
              updated : {new Date(parseInt(todo.updated)).toLocaleString("id-ID")}
            </p>
          </span>
        )}
      </div>
      <div className="space-x-3 ml-8 flex flex-wrap gap-2">
        <button
          className="mr-2 text-sm bg-blue-500 text-white sm:px-2 px-1 py-1 rounded hover:bg-blue-600 transition-colors"
          onClick={() => markCompleted(todo)}
          title={completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {completed ? <FaToggleOff /> : <FaToggleOn />}
        </button>
        {!isEditing && !completed && (
          <button
            className="mr-2 text-sm bg-purple-500 text-white sm:px-2 px-1 py-1 rounded hover:bg-purple-600 transition-colors"
            onClick={handleEdit}
            title="Edit todo"
          >
            <FaEdit />
          </button>
        )}
        <button
          className="mr-2 text-sm bg-red-500 text-white sm:px-2 px-1 py-1 rounded hover:bg-red-600 transition-colors"
          onClick={() => dispatch(removeTodo(todo.id))}
          title="Delete todo"
        >
          <FaTrash />
        </button>
        {!completed ? (
          <button
            className="text-sm bg-green-500 text-white sm:px-2 px-1 py-1 rounded hover:bg-green-600 transition-colors"
            onClick={() => markCompleted(todo)}
            title="Mark as complete"
          >
            <FaCheck />
          </button>
        ) : (
          ""
        )}
        {completed ? (
          <button
            className="text-sm bg-yellow-500 text-white sm:px-2 px-1 py-1 rounded hover:bg-yellow-600 transition-colors"
            onClick={() => markCompleted(todo)}
            title="Mark as incomplete"
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