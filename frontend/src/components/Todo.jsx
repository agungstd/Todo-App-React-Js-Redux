import { useState } from "react";
import { BsPlus, BsSearch } from "react-icons/bs";
import TodoList from "./TodoList.jsx";
import { useDispatch } from "react-redux";
import { isertTodo, searchTodos } from "../features/TotoSlice.js";

const Todo = () => {
  const [newTodoText, setNewTodoText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleAddTodoClick = () => {
    if (newTodoText) {
      dispatch(
        isertTodo({
          title: newTodoText,
          completed: 0,
          date: Date.now(),
          updated: Date.now(),
        })
      );
      setNewTodoText("");
    }
  };

  const handleSearchChange = () => {
    dispatch(searchTodos(searchTerm));
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">TODO APP</h1>
      
      <div className="todo-input-container">
        <input
          type="text"
          className="todo-input"
          placeholder="Add new todo..."
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
        />
        <button 
          className="add-todo-btn"
          onClick={handleAddTodoClick}
        >
          <BsPlus size={20} />
        </button>
      </div>
      
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search todos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button 
          className="search-btn"
          onClick={handleSearchChange}
        >
          <BsSearch size={16} />
        </button>
      </div>
      
      <TodoList />
    </div>
  );
};

export default Todo;