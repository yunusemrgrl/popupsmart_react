import { configureStore } from '@reduxjs/toolkit';
import { todoSlice } from './todos/todosSlice';

const store = configureStore({
  reducer: todoSlice.reducer,
});

export default store;
