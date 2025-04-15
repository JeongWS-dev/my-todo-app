// src/contexts/TodoContext.tsx

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface Todo {
  id: string;
  title: string;
  content: string;
  completed: boolean;
  createdAt: string;
}

type Filter = "all" | "completed" | "active";

interface TodoContextType {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  handleComplete: (id: string) => void;
  handleDelete: (id: string) => void;
  filter: Filter;
  setFilter: (filter: Filter) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Todo[];
        // ✅ createdAt이 없으면 기본값 채우기
        const fixed = parsed.map((todo) => ({
          ...todo,
          createdAt: todo.createdAt || new Date().toISOString(),
        }));
        setTodos(fixed);
      } catch (e) {
        console.error("로컬스토리지 파싱 오류:", e);
      }
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const handleComplete = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const [filter, setFilter] = useState<Filter>("all");

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        handleComplete,
        handleDelete,
        filter,
        setFilter,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error(
      "useTodoContext는 TodoProvider 안에서만 사용할 수 있습니다."
    );
  }
  return context;
};
