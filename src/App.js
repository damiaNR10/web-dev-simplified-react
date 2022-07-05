import TodoList from './TodoList';
import React, { useState, useRef, useEffect } from 'react';
import { v4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {
  const [todos, setTodos] = useState([]); 
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  const handleAddTodo = (e) => {
    const todoName = todoNameRef.current.value;
    if (todoName === '') return ;
    setTodos(prevTodos => 
      [...prevTodos, 
        {
          name: todoName, 
          complete: false, 
          id: v4(),
        }
      ]);
    todoNameRef.current.value = null;
  }

  const handleClearTodos = () => {
    const newTodos = todos.filter(todo => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <>
      <TodoList todoList = {todos} toggleTodo = {toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Completed Todos</button>
      <p>{todos.filter(todo => !todo.complete).length} left to do</p>
    </>
  );
}

export default App;
