// src/components/Modal/TodoDetailModal.tsx

import React from "react";
import { Todo } from "../../contexts/TodoContext";
import "./AddTodoModal.css"; // ✅ 기존 스타일 재활용

interface Props {
  todo: Todo;
  onClose: () => void;
}

const TodoDetailModal: React.FC<Props> = ({ todo, onClose }) => {
  const formattedDate = new Date(todo.createdAt).toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>{todo.title}</h2>
        <p style={{ whiteSpace: "pre-wrap", marginBottom: "16px" }}>
          {todo.content}
        </p>
        <p
          style={{ fontSize: "0.9rem", color: "#998675", marginBottom: "20px" }}
        >
          Created: {formattedDate}
        </p>
        <div className="modal-buttons">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default TodoDetailModal;
