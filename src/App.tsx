import React from 'react';
import TodoList from './components/TodoList/TodoList';
import { useAppDispatch, useAppSelector } from './hooks/hooks'
import { useEffect, useState } from 'react'
import { getTodos, postTodo } from './store/todosAPI';
import TodoInput from './components/TodoInput/TodoInput';

function App() {
  const [input, setInput] = useState('');
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.todos);

  const updateValue = (str: string) => {
    setInput(str);
  }

  const handleSubmit = () => {
    if (input.trim().length) {
      dispatch(postTodo(input.trim()));
      setInput('');
    }
  }

  useEffect(() => {
    dispatch(getTodos())
  }, [dispatch])

  return (
    <div>
      <TodoInput value={input} updateValue={updateValue} handleSubmit={handleSubmit}/>
      {<h2>Loading</h2> && loading}
      {<h2>Error</h2> && error}
      <TodoList />
    </div>
  );
}

export default App;
