import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoState } from "../types/todoTypes";
import { deleteTodo, getTodos, postTodo, toggleTodo } from "./todosAPI";

const initialState: TodoState = {
  list: [],
  loading: false,
  error: undefined,
};

const isError = (action: AnyAction) : boolean => {
  return action.type.endsWith('rejected');
}

const isPending = (action: AnyAction) : boolean => {
  return action.type.endsWith('pending');
}

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.fulfilled, (state, action) => {
        state.list = action.payload;
        state.error = undefined;
        state.loading = false;
      })
      .addCase(postTodo.fulfilled, (state, action) => {
        state.list.push(action.payload);
        state.error = undefined;
        state.loading = false;
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const toggledTodo = state.list.find(todo => todo.id === action.payload.id);
        if (toggledTodo) {
          toggledTodo.completed = !toggledTodo.completed;
        }
        state.error = undefined;
        state.loading = false;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.list = state.list.filter(todo => todo.id !== action.payload.id);
        state.error = undefined;
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addMatcher(isPending, (state) => {
        state.error = undefined;
        state.loading = true;
      })
  },
});

export default todosSlice.reducer;