import { createSlice } from "@reduxjs/toolkit";
import { TodoState } from '../types/todoTypes'

const initialState: TodoState = {
  list: [],
  loading: false,
  error: undefined,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default todosSlice.reducer;
export const {} = todosSlice.actions;
