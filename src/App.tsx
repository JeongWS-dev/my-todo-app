import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import ConfirmModal from "./components/ConfirmModal";
import { Todo } from "./types/todo";
import "./App.css";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [targetId, setTargetId] = useState<string | null>(null);

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

  // ✅ 할 일 추가 함수
  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  // ✅ 완료 상태 토글 함수
  const handleToggleComplete = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // ✅ 삭제 요청 → 모달 열기
  const handleRequestDelete = (id: string) => {
    setTargetId(id);
    setShowModal(true);
  };

  // ✅ 삭제 확인 시 삭제 실행
  const handleConfirmDelete = () => {
    if (targetId) {
      setTodos((prev) => prev.filter((todo) => todo.id !== targetId));
    }
    setTargetId(null);
    setShowModal(false);
  };

  // ✅ 삭제 취소 시 모달 닫기
  const handleCancelDelete = () => {
    setTargetId(null);
    setShowModal(false);
  };

  return (
    <div>
      <h1>To-do List</h1>
      <TodoInput onAdd={handleAddTodo} />
      <TodoList
        todos={todos}
        onToggleComplete={handleToggleComplete}
        onDelete={handleRequestDelete}
      />

      {showModal && (
        <ConfirmModal
          message="Are you sure you want to delete this?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}

export default App;
