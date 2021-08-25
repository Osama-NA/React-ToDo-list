import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList.js';
import {v4 as uuidv4} from 'uuid';

function App() {

  //useState is an asynchronous Hook that lets you add react state to function components
  //useState returns a pair of values: the current state and a function that updates it
  //Ex: here we declared a state variable called todos and passed an empty array as the initial state
  const [todos, setTodos] = useState([]);
  const [leftTodos, setLeftTodos] = useState(0);

  //useRef is a synchronous Hook that accepts one argument as the initial value and returns a reference
  //Here we assigned todoRef a reference of the text input with ref={todoRef}
  const todoRef = useRef();


  //Getting To-do's
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("To-do's"));
    const storedLeftTodos = localStorage.getItem("Left To-do's");
    if(storedTodos) setTodos(storedTodos);
    if(storedLeftTodos) setLeftTodos(storedLeftTodos);
  }, []);

  //After every render, useEffect hook tells React your component needs to do something
  //React will remember the function you passed, and call it later after performing the DOM updates

  //Storing To-do's
  useEffect(() => {
    localStorage.setItem("To-do's", JSON.stringify(todos));
    localStorage.setItem("Left To-do's", leftTodos);
  }, [todos, leftTodos]);

  //Called whenever a checkbox is clicked
  function ToggleTodo(id){
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
    setLeftTodos(todos.filter(todo => !todo.complete).length);
  }

  //Called when a todo is added
  function AddTodo(e){
    let text = todoRef.current.value;
    if(text === '') return;

    setTodos(todos => [...todos, { id: uuidv4(), text: text, complete: false }]);

    todoRef.current.value = null;
    setLeftTodos(todos.filter(todo => !todo.complete).length + 1);
  }

  //Called when a "clear completed" button is clicked
  function ClearCompleted(e) {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
    setLeftTodos(todos.filter(todo => !todo.complete).length);
  }

  return(
    <>
      <input ref={todoRef} type="text"/>
      <button onClick={AddTodo}>Add</button>
      <button onClick={ClearCompleted}>Clear Completed</button>
      <br /> <br />
      <TodoList todoList={todos} toggleTodo={ToggleTodo} />
      <br />
      <div>{leftTodos} left to do</div>
    </>
  );
}

export default App;
