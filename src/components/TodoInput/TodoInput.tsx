import React from 'react'
import './TodoInput.css'

type TodoInputProps = {
    value: string;
    updateValue: (str: string) => void;
    handleSubmit: () => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ value, updateValue, handleSubmit }) => {
    return (
        <div className='todo-input'>
            <input className='todo-input__input-field' type="text" value={value} onChange={(e) => updateValue(e.target.value)} />
            <button className='todo-input__submit-button' onClick={handleSubmit}>Add Todo</button>
        </div>
    )
}

export default TodoInput;