import { createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import {
  addTodosAsync,
  clearCompletedTodosAsync,
  deleteTodosAsync,
  getTodosAsync,
  toggleTodosAsync,
  updateTodosAsync,
} from './services';
export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    pending: false,
    search: '',
    isEditing: false,
    ActiveClass: localStorage.getItem('active-class'),
  },
  extraReducers: {
    [getTodosAsync.pending]: (state, action) => {
      message.loading({
        content: 'Loading...',
        key: 'todos_fetching',
      });
    },
    [getTodosAsync.fulfilled]: (state, action) => {
      state.todos = action.payload.reverse();
      message.success({
        content: 'Ok...',
        key: 'todos_fetching',
      });
    },
    [getTodosAsync.rejected]: (state, action) => {
      message.warning({
        content: action.error.message,
        key: 'todos_fetching',
      });
    },
    [addTodosAsync.pending]: (state, action) => {
      message.loading({
        content: 'Pending.. ',
        key: 'todos_post',
      });
    },
    [addTodosAsync.fulfilled]: (state, action) => {
      state.todos.unshift(action.payload);
      message.success({
        content: 'Eklendi.. ✔',
        key: 'todos_post',
      });
    },
    [addTodosAsync.rejected]: (state, action) => {
      message.warning({
        content: action.error.message,
        key: 'todos_post',
      });
    },
    [toggleTodosAsync.fulfilled]: (state, action) => {
      const { id, completed } = action.payload;
      const index = state.todos.findIndex((item) => item.id === id);
      state.todos[index].completed = completed;
    },
    [deleteTodosAsync.fulfilled]: (state, action) => {
      console.log(action.payload);
      const filtered = state.todos.filter((todo) => todo.id !== action.payload);
      state.todos = filtered;
    },
    [clearCompletedTodosAsync.fulfilled]: (state, action) => {
      const filtered = state.todos.filter((todo) => todo.id !== action.payload);
      state.todos = filtered;
    },
    [updateTodosAsync.fulfilled]: (state, action) => {
      console.log(action.payload);
      const { title, id } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      todo.title = title;
      todo.isEditing = false;
      const filtered = state.todos.filter((todo) => todo.id !== id);
      state.todos = [todo, ...filtered];
      state.isEditing = false;
      localStorage.setItem('list', JSON.stringify(state.todos));
    },
  },
  reducers: {
    editTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      todo.isEditing = true;
      state.isEditing = true;
      const filtered = state.todos.filter(
        (todo) => todo.id !== action.payload.id,
      );
      filtered.map((todo) => (todo.isEditing = false));
      state.todos = [todo, ...filtered];
      localStorage.setItem('list', JSON.stringify(state.todos));
    },
    setSearch: (state, action) => {
      state.search = action.payload.toLowerCase();
    },
  },
});

export const selectTodos = (state) => state.todos;

export const { SetActiveClass, ClearCompleted, SetAllCompleted } =
  todoSlice.actions;
export default todoSlice.reducer;

export const { clearCompleted, editTodo, updateTodo, setSearch } =
  todoSlice.actions;
