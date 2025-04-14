import React, { useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { Todo } from "./types/todo";
import "./App.css"; // 꼭 상단에 import 해주세요

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  return (
    <div>
      <h1>To-do List</h1>
      <TodoInput onAdd={handleAddTodo} />
      <TodoList todos={todos} />
    </div>
  );
}

export default App;
