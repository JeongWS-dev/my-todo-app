// src/components/AddTodoModal.tsx
import React, { useState } from "react";
import { useTodoContext } from "../../contexts/TodoContext";
import "./AddTodoModal.css"; // 스타일 따로 관리
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/DatePickerTheme.css";
import CustomDateTrigger from "../DatePicker/CustomDateTrigger";
import Holidays from "date-holidays";
import { getCountryCode } from "../../utils/localeUtils";

interface Props {
  onClose: () => void;
}

const AddTodoModal: React.FC<Props> = ({ onClose }) => {
  const { setTodos } = useTodoContext();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [visibleMonth, setVisibleMonth] = useState(new Date()); // 현재 보고 있는 달
  const [todoDate, setTodoDate] = useState<Date>(new Date());
  const language = "ko";
  const countryCode = getCountryCode(language);
  const hd = new Holidays(countryCode);

  const isHoliday = (date: Date) => {
    const result = hd.isHoliday(date);
    if (!result) return false;

    // result는 배열일 수도 있음 → 모두 검사
    const holidays = Array.isArray(result) ? result : [result];
    return holidays.some((h) => h.type === "public"); // ✅ public만 true
  };

  const handleSave = () => {
    if (!title.trim()) return;

    const newTodo = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      date: todoDate.toLocaleDateString("sv-SE"),
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
        <DatePicker
          selected={todoDate}
          onChange={(date) => {
            if (date) setTodoDate(date);
          }}
          onMonthChange={(date) => setVisibleMonth(date)}
          onYearChange={(date) => setVisibleMonth(date)}
          dateFormat="yyyy-MM-dd"
          customInput={<CustomDateTrigger />}
          className="custom-datepicker-input"
          dayClassName={(date) => {
            const classes = [];

            if (date.getMonth() !== visibleMonth.getMonth()) {
              classes.push("dp-outside-month");
            }

            const day = date.getDay();
            if (day === 0 || day === 6) {
              classes.push("dp-weekend");
            }

            if (isHoliday(date)) classes.push("dp-holiday");

            return classes.join(" ");
          }}
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
