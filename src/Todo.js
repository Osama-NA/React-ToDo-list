import React from 'react'

export default function Todo({ todo, toggleTodo}) {

    function HandleCheckbox(){
        toggleTodo(todo.id);
    }

    return (
        <div>
            <label>
                <input type="checkbox" checked={todo.complete} onChange={HandleCheckbox} />
                {todo.text}
            </label>
        </div>
    )
}
