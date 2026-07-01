import { useEffect, useRef, useState } from "react";
import PriorityBadge from "../PriorityBadge/PriorityBadge";
import { formatDueDate, isOverdue } from "../../utils/helpers";
import "./TodoItem.css";

const PRIORITIES = ["low", "medium", "high"];

function TodoItem({ todo, isRemoving, onToggle, onEdit, onRequestDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftText, setDraftText] = useState(todo.text);
  const [draftPriority, setDraftPriority] = useState(todo.priority);
  const editInputRef = useRef(null);

  useEffect(() => {
    if (isEditing) editInputRef.current?.focus();
  }, [isEditing]);

  function startEditing() {
    setDraftText(todo.text);
    setDraftPriority(todo.priority);
    setIsEditing(true);
  }

  function commitEdit() {
    const trimmed = draftText.trim();
    const updates = {};

    if (trimmed && trimmed !== todo.text) updates.text = trimmed;
    if (draftPriority !== todo.priority) updates.priority = draftPriority;

    if (Object.keys(updates).length > 0) {
      onEdit(todo.id, updates);
    }

    setIsEditing(false);
  }

  function handleEditKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      commitEdit();
    }
    if (event.key === "Escape") {
      setDraftText(todo.text);
      setDraftPriority(todo.priority);
      setIsEditing(false);
    }
  }

  function handleEditGroupBlur(event) {
    // only commit once focus leaves the whole edit group (text input + priority
    // buttons) — otherwise clicking a priority button would blur the text input
    // and close editing before the click registers
    if (event.currentTarget.contains(event.relatedTarget)) return;
    commitEdit();
  }

  const dueLabel = formatDueDate(todo.dueDate);
  const overdue = isOverdue(todo.dueDate, todo.completed);

  return (
    <li className={`todo-item ${todo.completed ? "todo-item--completed" : ""} ${isRemoving ? "todo-item--removing" : ""}`}>
      <button
        type="button"
        className="todo-item__checkbox"
        role="checkbox"
        aria-checked={todo.completed}
        aria-label={todo.completed ? "Mark task as active" : "Mark task as complete"}
        onClick={() => onToggle(todo.id)}
      >
        {todo.completed && (
          <svg viewBox="0 0 16 16" width="11" height="11" fill="none" aria-hidden="true">
            <path d="M3 8.5 6.2 12 13 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      <div className="todo-item__body">
        {isEditing ? (
          <div className="todo-item__edit-group" onBlur={handleEditGroupBlur}>
            <input
              ref={editInputRef}
              type="text"
              className="todo-item__edit-input"
              value={draftText}
              maxLength={140}
              onChange={(event) => setDraftText(event.target.value)}
              onKeyDown={handleEditKeyDown}
            />
            <div className="todo-item__edit-priority" role="radiogroup" aria-label="Priority">
              {PRIORITIES.map((level) => (
                <button
                  key={level}
                  type="button"
                  role="radio"
                  aria-checked={draftPriority === level}
                  className={`todo-item__priority-btn todo-item__priority-btn--${level} ${
                    draftPriority === level ? "is-active" : ""
                  }`}
                  onClick={() => setDraftPriority(level)}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <p className="todo-item__text" onDoubleClick={startEditing}>
            {todo.text}
          </p>
        )}

        <div className="todo-item__meta">
          <PriorityBadge priority={todo.priority} />
          {dueLabel && (
            <span className={`todo-item__due ${overdue ? "todo-item__due--overdue" : ""}`}>
              {overdue ? "Overdue · " : ""}
              {dueLabel}
            </span>
          )}
        </div>
      </div>

      <div className="todo-item__actions">
        <button
          type="button"
          className="todo-item__action-btn"
          aria-label="Edit task"
          onClick={startEditing}
        >
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">
            <path
              d="M4 17.5V20h2.5L18 8.5l-2.5-2.5L4 17.5Z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          className="todo-item__action-btn todo-item__action-btn--danger"
          aria-label="Delete task"
          onClick={() => onRequestDelete(todo)}
        >
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">
            <path
              d="M6 7h12M9.5 7V5h5v2M7.5 7l.8 12h7.4l.8-12"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
