import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllTodos = createAsyncThunk("todos/getAllTodos", async () => {
  try {
    const result = await axios.get("todo");
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const searchTodos = createAsyncThunk(
  "todos/searchTodos",
  async (query) => {
    try {
      const result = await axios.get(`todo?title_like=${query}`);
      return result.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const isertTodo = createAsyncThunk("todos/isertTodo", async (todo) => {
  try {
    await axios.post("todo", todo);
    const result = await axios.get("todo");
    return result.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
});

export const removeTodo = createAsyncThunk("todos/removeTodo", async (id) => {
  try {
    await axios.delete(`todo/${id}`);
    const result = await axios.get("todo");
    return result.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
});

export const updateTodo = createAsyncThunk("todos/updateTodo", async (todo) => {
  try {
    await axios.put(`todo/${todo.id}`, todo);
    const result = await axios.get("todo");
    return result.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
});

// New bulk operations
export const bulkToggleCompleted = createAsyncThunk(
  "todos/bulkToggleCompleted",
  async (setCompleted) => {
    try {
      // First get all todos
      const todosResponse = await axios.get("todo");
      const todos = todosResponse.data;
      
      // Update each todo with the new completed status
      const updatePromises = todos.map(todo => 
        axios.put(`todo/${todo.id}`, {
          ...todo,
          completed: setCompleted ? 1 : 0,
          updated: Date.now()
        })
      );
      
      // Wait for all updates to complete
      await Promise.all(updatePromises);
      
      // Return the updated todos
      const result = await axios.get("todo");
      return result.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

export const bulkDeleteCompleted = createAsyncThunk(
  "todos/bulkDeleteCompleted",
  async () => {
    try {
      // First get all completed todos
      const todosResponse = await axios.get("todo?completed=1");
      const completedTodos = todosResponse.data;
      
      // Delete each completed todo
      const deletePromises = completedTodos.map(todo => 
        axios.delete(`todo/${todo.id}`)
      );
      
      // Wait for all deletes to complete
      await Promise.all(deletePromises);
      
      // Return the remaining todos
      const result = await axios.get("todo");
      return result.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    data: null,
    loading: false,
    error: null,
    totalCount: 0,
    completedCount: 0,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTodos.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.data = null;
    });
    builder.addCase(getAllTodos.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
      state.totalCount = action.payload ? action.payload.length : 0;
      state.completedCount = action.payload ? action.payload.filter(todo => parseInt(todo.completed) === 1).length : 0;
    });
    builder.addCase(getAllTodos.rejected, (state, action) => {
      state.data = null;
      state.loading = false;
      state.error = action.error.message;
    });
    // search
    builder.addCase(searchTodos.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.data = null;
    });
    builder.addCase(searchTodos.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
      state.totalCount = action.payload ? action.payload.length : 0;
      state.completedCount = action.payload ? action.payload.filter(todo => parseInt(todo.completed) === 1).length : 0;
    });
    builder.addCase(searchTodos.rejected, (state, action) => {
      state.data = null;
      state.loading = false;
      state.error = action.error.message;
    });
    // insert
    builder.addCase(isertTodo.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.data = null;
    });
    builder.addCase(isertTodo.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
      state.totalCount = action.payload ? action.payload.length : 0;
      state.completedCount = action.payload ? action.payload.filter(todo => parseInt(todo.completed) === 1).length : 0;
    });
    builder.addCase(isertTodo.rejected, (state, action) => {
      state.data = null;
      state.loading = false;
      state.error = action.error.message;
    });
    // remove
    builder.addCase(removeTodo.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.data = null;
    });
    builder.addCase(removeTodo.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
      state.totalCount = action.payload ? action.payload.length : 0;
      state.completedCount = action.payload ? action.payload.filter(todo => parseInt(todo.completed) === 1).length : 0;
    });
    builder.addCase(removeTodo.rejected, (state, action) => {
      state.data = null;
      state.loading = false;
      state.error = action.error.message;
    });
    // update
    builder.addCase(updateTodo.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.data = null;
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
      state.totalCount = action.payload ? action.payload.length : 0;
      state.completedCount = action.payload ? action.payload.filter(todo => parseInt(todo.completed) === 1).length : 0;
    });
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.data = null;
      state.loading = false;
      state.error = action.error.message;
    });
    // bulk toggle completed
    builder.addCase(bulkToggleCompleted.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(bulkToggleCompleted.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
      state.totalCount = action.payload ? action.payload.length : 0;
      state.completedCount = action.payload ? action.payload.filter(todo => parseInt(todo.completed) === 1).length : 0;
    });
    builder.addCase(bulkToggleCompleted.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    // bulk delete completed
    builder.addCase(bulkDeleteCompleted.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(bulkDeleteCompleted.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
      state.totalCount = action.payload ? action.payload.length : 0;
      state.completedCount = action.payload ? action.payload.filter(todo => parseInt(todo.completed) === 1).length : 0;
    });
    builder.addCase(bulkDeleteCompleted.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { clearError } = todoSlice.actions;
export default todoSlice.reducer;