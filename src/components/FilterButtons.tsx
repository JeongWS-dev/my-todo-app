// src/components/FilterButtons.tsx
import React from "react";
import { useTodoContext } from "../contexts/TodoContext";
import "./FilterButtons.css"; // 스타일 따로 분리

const FilterButtons = () => {
  const { filter, setFilter } = useTodoContext();

  return (
    <div className="filter-container">
      <button
        className={`filter-btn ${filter === "all" ? "active" : ""}`}
        onClick={() => setFilter("all")}
      >
        All
      </button>
      <button
        className={`filter-btn ${filter === "completed" ? "active" : ""}`}
        onClick={() => setFilter("completed")}
      >
        Completed
      </button>
      <button
        className={`filter-btn ${filter === "active" ? "active" : ""}`}
        onClick={() => setFilter("active")}
      >
        Active
      </button>
    </div>
  );
};

export default FilterButtons;
