// src/components/AddTodoModal.tsx
import React, { useState } from "react";
import { useTodoContext } from "../contexts/TodoContext";
import "./AddTodoModal.css"; // 스타일 따로 관리

interface Props {
  onClose: () => void;
}

const AddTodoModal: React.FC<Props> = ({ onClose }) => {
  const { setTodos } = useTodoContext();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = () => {
    if (!title.trim()) return;

    const newTodo = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTodos((prev) => [...prev, newTodo]);
    onClose(); // 모달 닫기
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Add New Todo</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="modal-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddTodoModal;
