import React, { useState } from "react"; // React와 useState 훅을 불러옴

interface Props {
  onAdd: (text: string) => void; // 부모 컴포넌트로부터 받아올 함수의 타입
}

const TodoInput: React.FC<Props> = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("📥 handleSubmit 실행됨, 입력값:", text);
    if (!text.trim()) return;
    onAdd(text.trim());
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
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoInput;
