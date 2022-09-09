import { createAsyncThunk } from "@reduxjs/toolkit";
import { Todo, TodoState } from "../types/todoTypes";

export const getTodos = createAsyncThunk<
  Todo[],
  undefined,
  { rejectValue: string }
>("todos/getTodos", async function (_, { rejectWithValue }) {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=15"
  );
  if (!response.ok) return rejectWithValue("Can't get todos, server error");
  return (await response.json()) as Todo[];
});

export const postTodo = createAsyncThunk<Todo, string, { rejectValue: string }>(
  "todos/postTodo",
  async (title, { rejectWithValue }) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userId: 1,
        title,
        completed: false,
      }),
    });
    if (!response.ok) return rejectWithValue("Can't make todo, server error");
    return (await response.json()) as Todo;
  }
);

export const toggleTodo = createAsyncThunk<
  Todo,
  number,
  { rejectValue: string; state: { todos: TodoState } }
>("todos/toggleTodo", async (id, { rejectWithValue, getState }) => {
  const todo: Todo | undefined = getState().todos.list.find(
    (todo) => todo.id === id
  );
  if (todo) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      }
    );
    if (!response.ok) return rejectWithValue("Can't update todo, server error");
    return (await response.json()) as Todo;
  }
  return rejectWithValue("Can't find todo");
});

export const deleteTodo = createAsyncThunk<
  Todo,
  number,
  { rejectValue: string, state: { todos: TodoState } }
>("todos/deleteTodo", async (id, { rejectWithValue, getState }) => {
  const todo = getState().todos.list.find((todo) => todo.id === id);
  if (todo) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) return rejectWithValue("Can't delete todo, server error");
    return todo;
  }
  return rejectWithValue("Can't find todo");
});
