// src/components/TodoList.tsx
import React from "react";
import { Todo } from "../types/todo";

interface Props {
  todos: Todo[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void; // 삭제 요청만 전달
}

const TodoList: React.FC<Props> = ({ todos, onToggleComplete, onDelete }) => {
  return (
    <ul>
      {todos.length === 0 ? (
        <li>No tasks yet.</li>
      ) : (
        todos.map((todo) => (
          <li key={todo.id}>
            {/* 삭제 요청 버튼 (오른쪽 상단) */}
            <button
              className="delete-x"
              onClick={() => onDelete(todo.id)} // ✅ confirm은 App에서 처리
              aria-label="Delete"
              title="Delete"
            >
              ×
            </button>

            {/* 텍스트 + 완료 버튼 */}
            <div className="todo-content">
              <span className={todo.completed ? "completed" : ""}>
                {todo.text} {todo.completed ? "(Done)" : ""}
              </span>
              <button type="button" onClick={() => onToggleComplete(todo.id)}>
                {todo.completed ? "Cancel" : "Complete"}
              </button>
            </div>
          </li>
        ))
      )}
    </ul>
  );
};

export default TodoList;
