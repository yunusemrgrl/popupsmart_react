import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';
const user_id = localStorage.getItem('user_id');
export const getTodosAsyc = createAsyncThunk(
  'todos/getTodosAsync',
  async () => {
    const res = await axios.get(
      `https://630db812b37c364eb709dbdf.mockapi.io/users/${user_id}/todos`,
    );
    console.log(res);
    return res.data;
  },
);

export const addTodosAsyc = createAsyncThunk(
  'todos/addTodosAsync',
  async (data) => {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_END_POINT}/todos`,
      data,
    );
    return res.data;
  },
);
export const toggleTodosAsyc = createAsyncThunk(
  'todos/toggleTodosAsync',
  async ({ id, data }) => {
    const res = await axios.patch(
      `${process.env.REACT_APP_BASE_END_POINT}/todos/${id}`,
      data,
    );
    return res.data;
  },
);
export const setCompletedTodosAsyc = createAsyncThunk(
  'todos/setCompletedTodosAsyc',
  async ({ id, data }) => {
    const res = await axios.patch(
      `${process.env.REACT_APP_BASE_END_POINT}/todos/${id}`,
      data,
    );

    return res.data;
  },
);
export const deleteTodosAsyc = createAsyncThunk(
  'todos/deleteTodosAsync',
  async (id) => {
    await axios.delete(`${process.env.REACT_APP_BASE_END_POINT}/todos/${id}`);
    return id;
  },
);
export const clearCompeletedTodosAsyc = createAsyncThunk(
  'todos/deleteTodosAsync',
  async (id) => {
    const res = await axios.delete(
      `${process.env.REACT_APP_BASE_END_POINT}/todos/${id}`,
    );
    return res.data;
  },
);
