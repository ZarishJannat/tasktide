import { useRef, useState } from "react";
import "./TodoForm.css";

const PRIORITIES = ["low", "medium", "high"];

function TodoForm({ onAdd }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();

    const result = onAdd({ text, priority, dueDate: dueDate || null });

    if (!result.ok) {
      setError(result.reason);
      inputRef.current?.focus();
      return;
    }

    setText("");
    setDueDate("");
    setPriority("medium");
    setError(null);
  }

  function handleTextChange(event) {
    setText(event.target.value);
    if (error) setError(null);
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit} noValidate>
      <div className={`todo-form__row ${error ? "todo-form__row--error" : ""}`}>
        <input
          ref={inputRef}
          type="text"
          className="todo-form__input"
          placeholder="What needs doing?"
          aria-label="Task description"
          value={text}
          onChange={handleTextChange}
          maxLength={140}
        />
        <button type="submit" className="todo-form__submit" aria-label="Add task">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {error && (
        <p className="todo-form__error" role="alert">
          {error === "duplicate" ? "That task is already on your list." : "Type something before adding."}
        </p>
      )}

      <div className="todo-form__meta">
        <label className="todo-form__field">
          <span className="visually-hidden">Due date</span>
          <input
            type="date"
            className="todo-form__date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
          />
        </label>

        <div className="todo-form__priority" role="radiogroup" aria-label="Priority">
          {PRIORITIES.map((level) => (
            <button
              key={level}
              type="button"
              role="radio"
              aria-checked={priority === level}
              className={`todo-form__priority-btn todo-form__priority-btn--${level} ${
                priority === level ? "is-active" : ""
              }`}
              onClick={() => setPriority(level)}
            >
              {level}
            </button>
          ))}
        </div>
      </div>
    </form>
  );
}

export default TodoForm;
