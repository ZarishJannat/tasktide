import { useCallback, useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { createId } from "../utils/helpers";

const TODOS_API_URL = "https://dummyjson.com/todos?limit=10";
const PRIORITIES = ["low", "medium", "high"];

export function useTodos() {
  const [todos, setTodos] = useLocalStorage("tasktide-todos", []);
  const [seeded, setSeeded] = useLocalStorage("tasktide-seeded", false);
  const [isLoading, setIsLoading] = useState(!seeded);
  const [loadError, setLoadError] = useState(null);

  // On first ever visit (nothing saved yet), pull a starter list from the
  // DummyJSON Todos API instead of shipping hardcoded sample tasks. Once
  // that's happened once, `seeded` is persisted so we never overwrite the
  // user's own list on later visits.
  useEffect(() => {
    if (seeded) {
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    async function seedFromApi() {
      try {
        const response = await fetch(TODOS_API_URL);
        if (!response.ok) throw new Error(`Request failed with ${response.status}`);

        const data = await response.json();
        if (cancelled) return;

        const fetchedTodos = (data.todos || []).map((item, index) => ({
          id: createId(),
          text: item.todo,
          completed: item.completed,
          // DummyJSON todos don't include a priority or date, so we assign a
          // rotating priority for visual variety and leave dueDate empty —
          // the user can set one via the edit view.
          priority: PRIORITIES[index % PRIORITIES.length],
          dueDate: null,
          createdAt: new Date().toISOString(),
        }));

        setTodos((current) => (current.length > 0 ? current : fetchedTodos));
        setSeeded(true);
      } catch (error) {
        if (!cancelled) {
          setLoadError("Couldn't load starter tasks from the API. Add your own below.");
        }
        console.warn("Failed to seed todos from DummyJSON", error);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    seedFromApi();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    isLoading,
    loadError,
    addTodo,
    editTodo,
    deleteTodo,
    toggleComplete,
    clearCompleted,
  };
}
