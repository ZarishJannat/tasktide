import { useEffect, useMemo, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import TodoForm from "../../components/TodoForm/TodoForm";
import TodoList from "../../components/TodoList/TodoList";
import SearchBar from "../../components/SearchBar/SearchBar";
import FilterButtons from "../../components/FilterButtons/FilterButtons";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import EmptyState from "../../components/EmptyState/EmptyState";
import Modal from "../../components/Modal/Modal";
import Toast from "../../components/Toast/Toast";
import Footer from "../../components/Footer/Footer";
import { useTheme } from "../../hooks/useTheme";
import { useTodos } from "../../hooks/useTodos";
import { useToast } from "../../hooks/useToast";
import { getGreeting, getTodayLabel } from "../../utils/helpers";
import { getRandomQuote } from "../../utils/quotes";
import "./Home.css";

function Home() {
  const { theme, toggleTheme } = useTheme();
  const {
    todos,
    isLoading,
    loadError,
    addTodo,
    editTodo,
    deleteTodo,
    toggleComplete,
    clearCompleted,
  } = useTodos();
  const { toasts, showToast, dismissToast } = useToast();

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [pendingDelete, setPendingDelete] = useState(null);
  const [removingId, setRemovingId] = useState(null);

  const [quote] = useState(getRandomQuote);
  const greeting = getGreeting();
  const todayLabel = getTodayLabel();

  useEffect(() => {
    if (loadError) showToast({ message: loadError });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadError]);

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;
  const activeCount = totalCount - completedCount;
  const allDone = totalCount > 0 && completedCount === totalCount;

  const visibleTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (filter === "active" && todo.completed) return false;
      if (filter === "completed" && !todo.completed) return false;
      if (search.trim() && !todo.text.toLowerCase().includes(search.trim().toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [todos, filter, search]);

  function handleAdd(payload) {
    const result = addTodo(payload);
    if (result.ok) showToast({ message: "Task added" });
    return result;
  }

  function handleToggle(id) {
    const todo = todos.find((item) => item.id === id);
    if (!todo) return;

    toggleComplete(id);

    if (!todo.completed) {
      showToast({
        message: "Task completed",
        action: { label: "Undo", onClick: () => toggleComplete(id) },
      });
    }
  }

  function handleEdit(id, updates) {
    editTodo(id, updates);
    showToast({ message: "Task updated" });
  }

  function handleRequestDelete(todo) {
    setPendingDelete(todo);
  }

  function handleConfirmDelete() {
    const todo = pendingDelete;
    setPendingDelete(null);
    setRemovingId(todo.id);

    setTimeout(() => {
      deleteTodo(todo.id);
      setRemovingId(null);
      showToast({ message: "Task deleted" });
    }, 220);
  }

  function handleClearCompleted() {
    if (completedCount === 0) return;
    clearCompleted();
    showToast({ message: "Completed tasks cleared" });
  }

  function getEmptyVariant() {
    if (totalCount === 0) return "no-tasks";
    if (filter === "active" && activeCount === 0) return "all-done";
    return "no-results";
  }

  return (
    <div className="app-shell">
      <main className="app-card">
        <Navbar theme={theme} onToggleTheme={toggleTheme} />

        <section className="app-card__intro">
          <h1 className="app-card__heading">{greeting}</h1>
          <div className="app-card__subline">
            <span>{todayLabel}</span>
            <span className="app-card__dot" aria-hidden="true" />
            <span className="app-card__quote">{quote}</span>
          </div>
        </section>

        <TodoForm onAdd={handleAdd} />

        {totalCount > 0 && <ProgressBar completed={completedCount} total={totalCount} />}

        <div className="app-card__controls">
          <SearchBar value={search} onChange={setSearch} />
          <FilterButtons active={filter} onChange={setFilter} />
        </div>

        {completedCount > 0 && (
          <button type="button" className="app-card__clear-btn" onClick={handleClearCompleted}>
            Clear completed ({completedCount})
          </button>
        )}

        <div className="app-card__list">
          {isLoading ? (
            <div className="app-card__skeleton">
              <div className="skeleton-row" />
              <div className="skeleton-row" />
              <div className="skeleton-row" />
            </div>
          ) : visibleTodos.length === 0 ? (
            <EmptyState variant={getEmptyVariant()} />
          ) : (
            <TodoList
              todos={visibleTodos}
              removingId={removingId}
              onToggle={handleToggle}
              onEdit={handleEdit}
              onRequestDelete={handleRequestDelete}
            />
          )}
        </div>

        {allDone && !isLoading && (
          <p className="app-card__celebration">Nice work — everything's done for today.</p>
        )}
      </main>

      <Footer />

      {pendingDelete && (
        <Modal
          title="Delete this task?"
          message={`"${pendingDelete.text}" will be removed for good.`}
          confirmLabel="Delete"
          danger
          onConfirm={handleConfirmDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}

      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default Home;
