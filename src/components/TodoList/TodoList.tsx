import React from 'react'
import { useAppSelector } from '../../hooks/hooks'
import TodoItem from '../TodoItem/TodoItem'
import './TodoList.css'

export default function TodoList() {
    const todos = useAppSelector(state => state.todos.list);

  return (
    <ul className='todo-list'>
        {todos.map(todo => {
            return (
                <TodoItem key={todo.id} {...todo}/>
            )
        })}
    </ul>
  )
}
