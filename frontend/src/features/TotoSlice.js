import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllTodos = createAsyncThunk("todos/getAllTodos", async () => {
  try {
    const result = await axios.get("todo");
    return result.data;
  } catch (error) {
    console.log(error);
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
  }
});

export const removeTodo = createAsyncThunk("todos/removeTodo", async (id) => {
  try {
    await axios.delete(`todo/${id}`);
    const result = await axios.get("todo");
    return result.data;
  } catch (err) {
    console.log(err);
  }
});

export const updateTodo = createAsyncThunk("todos/updateTodo", async (todo) => {
  try {
    await axios.put(`todo/${todo.id}`, todo);
    const result = await axios.get("todo");
    return result.data;
  } catch (err) {
    console.log(err);
  }
});

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
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
    });
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.data = null;
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default todoSlice.reducer;
