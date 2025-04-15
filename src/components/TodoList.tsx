// src/components/TodoList.tsx
import React from "react";
import { useTodoContext } from "../contexts/TodoContext";

interface Props {
  onDelete: (id: string) => void; // 삭제 요청은 App.tsx에서 처리
}

const TodoList: React.FC<Props> = ({ onDelete }) => {
  const { todos, handleComplete, filter } = useTodoContext();

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true;
  });

  return (
    <ul>
      {filteredTodos.length === 0 ? (
        <li>No tasks yet.</li>
      ) : (
        filteredTodos.map((todo) => (
          <li key={todo.id}>
            {/* 삭제 요청 버튼 (오른쪽 상단) */}
            <button
              className="delete-x"
              onClick={() => onDelete(todo.id)} // App.tsx에서 모달 띄움
              aria-label="Delete"
              title="Delete"
            >
              ×
            </button>

            {/* 텍스트 + 완료 버튼 */}
            <div className="todo-content">
              <span className={todo.completed ? "completed" : ""}>
                {todo.title} {todo.completed ? "(Done)" : ""}
              </span>
              <button type="button" onClick={() => handleComplete(todo.id)}>
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
