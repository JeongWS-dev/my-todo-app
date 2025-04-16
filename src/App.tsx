// src/App.tsx

import { useState } from "react";
import TodoList from "./components/TodoList";
import ConfirmModal from "./components/Modal/ConfirmModal";
import { TodoProvider } from "./contexts/TodoContext";
import FilterButtons from "./components/FilterButtons";
import AddTodoModal from "./components/Modal/AddTodoModal";
import TodoDetailModal from "./components/Modal/TodoDetailModal";
import { Todo } from "./contexts/TodoContext";
import "./App.css";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [targetId, setTargetId] = useState<string | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  // ✅ 삭제 요청 → 모달 열기
  const handleRequestDelete = (id: string) => {
    setTargetId(id);
    setShowModal(true);
  };

  return (
    <TodoProvider>
      <div className="todo-wrapper">
        {/* 제목은 한 줄 위 */}
        <h1 style={{ marginBottom: "35px" }}>To-do List</h1>

        {/* 필터 버튼 + +버튼을 같은 라인에 배치 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <FilterButtons />
          <button
            className="addModalBtn"
            onClick={() => {
              setShowAddModal(true);
            }}
          >
            ＋
          </button>
        </div>

        <TodoList
          onDelete={handleRequestDelete}
          onSelect={(todo) => setSelectedTodo(todo)}
        />

        {showModal && targetId && (
          <ConfirmModal
            message="Are you sure you want to delete this?"
            targetId={targetId}
            closeModal={() => {
              setTargetId(null);
              setShowModal(false);
            }}
          />
        )}
        {showAddModal && (
          <AddTodoModal onClose={() => setShowAddModal(false)} />
        )}
        {selectedTodo && (
          <TodoDetailModal
            todo={selectedTodo}
            onClose={() => setSelectedTodo(null)}
          />
        )}
      </div>
    </TodoProvider>
  );
}

export default App;
