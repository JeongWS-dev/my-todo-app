// src/App.tsx

import { useState } from "react";
import TodoList from "./components/TodoList";
import ConfirmModal from "./components/Modal/ConfirmModal";
import { TodoProvider, useTodoContext, Todo } from "./contexts/TodoContext";
import FilterButtons from "./components/FilterButtons";
import AddTodoModal from "./components/Modal/AddTodoModal";
import TodoDetailModal from "./components/Modal/TodoDetailModal";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./styles/CalendarTheme.css";
import "./App.css";
import Holidays from "date-holidays";
import { getCountryCode } from "./utils/localeUtils";

// ✅ 실제 기능 구현은 AppContent 내부에서 처리
function AppContent() {
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [targetId, setTargetId] = useState<string | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const language = "ko"; // 나중에 다국어 연결 예정
  const hd = new Holidays(getCountryCode(language));
  const isHoliday = (date: Date) => {
    const result = hd.isHoliday(date);
    if (!result) return false;

    // result는 배열일 수도 있음 → 모두 검사
    const holidays = Array.isArray(result) ? result : [result];
    return holidays.some((h) => h.type === "public"); // ✅ public만 true
  };
  const { todos } = useTodoContext();

  const formattedDate = selectedDate.toLocaleDateString("sv-SE");

  // ✅ 날짜 기준 필터링
  const filteredTodosByDate = todos.filter(
    (todo) => todo.date === formattedDate
  );

  // ✅ 삭제 요청 → 모달 열기
  const handleRequestDelete = (id: string) => {
    setTargetId(id);
    setShowModal(true);
  };

  return (
    <div className="todo-wrapper">
      <h1 style={{ marginBottom: "35px" }}>To-do List</h1>

      {/* ✅ 날짜 선택 UI */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "24px",
          }}
        >
          <Calendar
            onChange={(value) => {
              if (value instanceof Date) {
                setSelectedDate(value);
              }
            }}
            value={selectedDate}
            calendarType="gregory"
            locale="en-US"
            tileClassName={({ date, view }) => {
              const classes = [];

              if (view === "month") {
                if (isHoliday(date)) classes.push("dp-holiday");
              }

              return classes.join(" ");
            }}
          />
        </div>
      </div>

      {/* 필터 버튼 + +버튼 */}
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

      {/* 할 일 목록 */}
      <TodoList
        todos={filteredTodosByDate}
        onDelete={handleRequestDelete}
        onSelect={(todo) => setSelectedTodo(todo)}
      />

      {/* 삭제 확인 모달 */}
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

      {/* 할 일 추가 모달 */}
      {showAddModal && <AddTodoModal onClose={() => setShowAddModal(false)} />}

      {/* 할 일 상세 보기 모달 */}
      {selectedTodo && (
        <TodoDetailModal
          todo={selectedTodo}
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </div>
  );
}

// ✅ TodoProvider로 감싸서 Context 유효하게 만들기
function App() {
  return (
    <TodoProvider>
      <AppContent />
    </TodoProvider>
  );
}

export default App;
