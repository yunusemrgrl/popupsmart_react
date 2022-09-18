import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

const user_id = localStorage.getItem('user_id');

export const getTodosAsync = createAsyncThunk(
  'todos/getTodosAsync',
  async () => {
    const res = await axios.get(
      `https://630db812b37c364eb709dbdf.mockapi.io/users/${user_id}/todos`,
    );
    return res.data;
  },
);

export const addTodosAsync = createAsyncThunk(
  'todos/addTodosAsync',
  async (data) => {
    const res = await axios.post(
      `https://630db812b37c364eb709dbdf.mockapi.io/users/${user_id}/todos`,
      data,
    );
    return res.data;
  },
);
export const toggleTodosAsync = createAsyncThunk(
  'todos/toggleTodosAsync',
  async ({ id, data }) => {
    const res = await axios.put(
      `https://630db812b37c364eb709dbdf.mockapi.io/users/${user_id}/todos/${id}`,
      data,
    );
    return res.data;
  },
);
export const deleteTodosAsync = createAsyncThunk(
  'todos/deleteTodosAsync',
  async (id) => {
    console.log(id);
    await axios.delete(
      `https://630db812b37c364eb709dbdf.mockapi.io/users/${user_id}/todos/${id}`,
    );
    return id;
  },
);
export const clearCompletedTodosAsync = createAsyncThunk(
  'todos/clearCompletedTodosAsync',
  async (id) => {
    await axios.delete(
      `https://630db812b37c364eb709dbdf.mockapi.io/users/${user_id}/todos/${id}`,
    );
    return id;
  },
);
export const updateTodosAsync = createAsyncThunk(
  'todos/updateTodosAsync',
  async (action) => {
    const title = action.title;
    const id = action.id;
    const todo = action.todo;
    await axios.put(
      `https://630db812b37c364eb709dbdf.mockapi.io/users/${user_id}/todos/${id}`,
      { ...todo, title: title, isEditing: false },
    );
    return { title, id };
  },
);
