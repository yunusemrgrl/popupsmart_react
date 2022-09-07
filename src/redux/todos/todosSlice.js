import { createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import {
  addTodosAsyc,
  deleteTodosAsyc,
  getTodosAsyc,
  toggleTodosAsyc,
  setCompletedTodosAsyc,
  clearCompeletedTodosAsyc,
} from './services';

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    search: '',
    isEditing: false,
    ActiveClass: localStorage.getItem('active-class'),
  },
  extraReducers: {
    [getTodosAsyc.pending]: (state, action) => {
      message.loading({
        content: 'Loading...',
        key: 'todos_fetching',
      });
    },
    [getTodosAsyc.fulfilled]: (state, action) => {
      state.todos = action.payload;
      console.log(state.todos);
      message.success({
        content: 'Ok...',
        key: 'todos_fetching',
      });
    },
    [getTodosAsyc.rejected]: (state, action) => {
      message.warning({
        content: action.error.message,
        key: 'todos_fetching',
      });
    },
    // add todos
    [addTodosAsyc.pending]: (state, action) => {
      message.loading({
        content: 'Pending.. ',
        key: 'todos_post',
      });
    },
    [addTodosAsyc.fulfilled]: (state, action) => {
      state.todos.unshift(action.payload);
      message.success({
        content: 'Eklendi.. ✔',
        key: 'todos_post',
      });
    },
    [addTodosAsyc.rejected]: (state, action) => {
      message.warning({
        content: action.error.message,
        key: 'todos_post',
      });
    },
    // toggle todo
    [toggleTodosAsyc.fulfilled]: (state, action) => {
      const { id, completed } = action.payload;
      const index = state.todos.findIndex((item) => item.id === id);
      state.todos[index].completed = completed;
    },
    // completed todos
    [setCompletedTodosAsyc.fulfilled]: (state, action) => {
      // console.log(action.payload);
      const { id, completed } = action.payload;
      const index = state.todos.findIndex((item) => item.id === id);
      state.todos[index].completed = completed;
    },
    // delete todo
    [deleteTodosAsyc.fulfilled]: (state, action) => {
      const id = action.payload;
      const filtered = state.todos.filter((item) => item.id !== id);
      state.todos = filtered;
    },
    // clear completed todos
    [clearCompeletedTodosAsyc.fulfilled]: (state, action) => {
      const filtered = action.payload;
      state.todos = filtered;
    },
  },
  // reducers: {
  //   addTodo: (state, action) => {
  //     state.todos.push({
  //       title: action.payload.title,
  //       id: new Date().getTime(),
  //       completed: false,
  //       class: action.payload.class,
  //       isEditing: false,
  //     });
  //     state.filteredTodos = state.todos;
  //     localStorage.setItem('list', JSON.stringify(state.todos));
  //   },
  //   deleteTodo: (state, action) => {
  //     const id = action.payload;
  //     const filtered = state.todos.filter((todo) => todo.id !== id);
  //     state.todos = filtered;
  //     localStorage.setItem('list', JSON.stringify(state.todos));
  //   },
  //   changeStatus: (state, action) => {
  //     const todo = state.todos.find((todo) => todo.id === action.payload);
  //     todo.completed = !todo.completed;
  //     localStorage.setItem('list', JSON.stringify(state.todos));
  //   },
  //   clearCompleted: (state, action) => {
  //     const filtered = state.todos.filter(
  //       (todo) => todo.class !== action.payload,
  //     );
  //     const thisClassArr = state.todos.filter(
  //       (todo) => todo.class === action.payload,
  //     );
  //     const clearCompleted = thisClassArr.filter((todo) => !todo.completed);
  //     const filteredTodos = [...filtered, ...clearCompleted];
  //     state.todos = filteredTodos;
  //     localStorage.setItem('list', JSON.stringify(state.todos));
  //   },
  //   editTodo: (state, action) => {
  //     const todo = state.todos.find((todo) => todo.id === action.payload.id);
  //     todo.isEditing = true;
  //     state.isEditing = true;
  //     const filtered = state.todos.filter(
  //       (todo) => todo.id !== action.payload.id,
  //     );
  //     filtered.map((todo) => (todo.isEditing = false));
  //     state.todos = [todo, ...filtered];
  //     localStorage.setItem('list', JSON.stringify(state.todos));
  //   },
  //   updateTodo: (state, action) => {
  //     const { title, id } = action.payload;
  //     const todo = state.todos.find((todo) => todo.id === id);
  //     todo.title = title;
  //     todo.isEditing = false;
  //     const filtered = state.todos.filter((todo) => todo.id !== id);
  //     state.todos = [todo, ...filtered];
  //     state.isEditing = false;
  //     localStorage.setItem('list', JSON.stringify(state.todos));
  //   },
  //   setSearch: (state, action) => {
  //     state.search = action.payload.toLowerCase();
  //   },
  // },
});

export const selectTodos = (state) => state.todos.todos;

export const selectFilteredTodos = (state) => {
  if (state.todos.ActiveClass === 'all') {
    return state.todos.todos;
  }
  return state.todos.todos.filter((todo) =>
    state.todos.ActiveClass === 'active'
      ? todo.completed === false
      : todo.completed === true,
  );
};

export const { SetActiveClass, ClearCompleted, SetAllCompleted } =
  todoSlice.actions;
export default todoSlice.reducer;

export const {
  addTodo,
  deleteTodo,
  changeStatus,
  clearCompleted,
  editTodo,
  updateTodo,
  setSearch,
} = todoSlice.actions;
