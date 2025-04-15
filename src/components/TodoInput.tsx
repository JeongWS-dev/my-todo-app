import React, { useState } from "react";
import { useTodoContext } from "../contexts/TodoContext";

const TodoInput: React.FC = () => {
  const [text, setText] = useState("");
  const { setTodos } = useTodoContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("📥 handleSubmit 실행됨, 입력값:", text);
    if (!text.trim()) return;

    const newTodo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTodos((prev) => [...prev, newTodo]);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button id="AddBtn" type="submit">
        Add
      </button>
    </form>
  );
};

export default TodoInput;
