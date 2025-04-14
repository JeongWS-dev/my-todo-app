// src/components/TodoList.tsx
import React from "react";
import { Todo } from "../types/todo"; // 타입 불러오기

interface Props {
  todos: Todo[];
}

const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul>
      {todos.length === 0 ? (
        <li>No tasks yet.</li>
      ) : (
        todos.map((todo) => (
          <li key={todo.id}>
            {todo.text} {todo.completed ? "(Done)" : ""}
          </li>
        ))
      )}
    </ul>
  );
};

export default TodoList;
