import React from 'react'
import Todo from './Todo.js'

export default function TodoList({ todoList, toggleTodo}) {
    return (
        todoList.map(todo => <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} />)
    )
}
