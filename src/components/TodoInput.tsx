import React, { useState } from "react"; // React와 useState 훅을 불러옴

interface Props {
  onAdd: (text: string) => void; // 부모 컴포넌트로부터 받아올 함수의 타입
}

const TodoInput: React.FC<Props> = ({ onAdd }) => {
  const [text, setText] = useState(""); // 입력창에 입력된 텍스트 상태 관리

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 새로고침 방지
    if (!text.trim()) return; // 공백 입력 방지
    onAdd(text.trim()); // 부모 컴포넌트에 전달
    setText(""); // 입력창 비우기
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
