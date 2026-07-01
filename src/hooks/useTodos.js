import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { createId } from "../utils/helpers";

export function useTodos() {
  const [todos, setTodos] = useLocalStorage("tasktide-todos", []);

  const addTodo = useCallback(
    ({ text, priority = "medium", dueDate = null }) => {
      const trimmed = text.trim();

      if (!trimmed) {
        return { ok: false, reason: "empty" };
      }

      const isDuplicate = todos.some(
        (todo) => todo.text.trim().toLowerCase() === trimmed.toLowerCase()
      );

      if (isDuplicate) {
        return { ok: false, reason: "duplicate" };
      }

      const newTodo = {
        id: createId(),
        text: trimmed,
        completed: false,
        priority,
        dueDate,
        createdAt: new Date().toISOString(),
      };

      setTodos((current) => [newTodo, ...current]);
      return { ok: true, todo: newTodo };
    },
    [todos, setTodos]
  );

  const editTodo = useCallback(
    (id, updates) => {
      setTodos((current) =>
        current.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
      );
    },
    [setTodos]
  );

  const deleteTodo = useCallback(
    (id) => {
      setTodos((current) => current.filter((todo) => todo.id !== id));
    },
    [setTodos]
  );

  const toggleComplete = useCallback(
    (id) => {
      setTodos((current) =>
        current.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    },
    [setTodos]
  );

  const clearCompleted = useCallback(() => {
    setTodos((current) => current.filter((todo) => !todo.completed));
  }, [setTodos]);

  return {
    todos,
    addTodo,
    editTodo,
    deleteTodo,
    toggleComplete,
    clearCompleted,
  };
}
