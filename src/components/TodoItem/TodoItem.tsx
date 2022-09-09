import React from 'react'
import { useAppDispatch } from '../../hooks/hooks'
import { deleteTodo, toggleTodo } from '../../store/todosAPI';
import { Todo } from '../../types/todoTypes'


const TodoItem: React.FC<Todo> = (todo) => {
  const dispatch = useAppDispatch();
  const id = todo.id;
  const handleButton = () => {
    dispatch(deleteTodo(id))
  }

  const handleCheckbox = () => {
    dispatch(toggleTodo(id));
  }

  return (
      <label className='todo-item'>
        <input className='todo-item__checkbox' type="checkbox" id={String(todo.id)} onChange={handleCheckbox} checked={todo.completed}/>
        <h3 className='todo-item__title' >{todo.title}</h3>
        <button className='todo-item__delete' onClick={handleButton}>❌</button>
      </label>
  )
}

export default TodoItem;
