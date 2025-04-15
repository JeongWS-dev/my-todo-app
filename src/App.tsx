import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { Todo } from "./types/todo";
import "./App.css";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // ✅ 앱 시작 시 LocalStorage에서 불러오기
  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) {
      try {
        setTodos(JSON.parse(stored) as Todo[]);
      } catch (error) {
        console.error("로컬스토리지 파싱 오류:", error);
      }
    }
  }, []);

  // ✅ todos가 변경될 때 LocalStorage에 저장하기
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos((prev) => {
      const updated = [...prev, newTodo];
      return updated;
    });
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
