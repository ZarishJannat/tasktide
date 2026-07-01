import "./EmptyState.css";

const COPY = {
  "no-tasks": {
    title: "Nothing on your plate",
    body: "Add your first task above and it'll show up here.",
  },
  "no-results": {
    title: "No matches",
    body: "Try a different search term or filter.",
  },
  "all-done": {
    title: "All caught up",
    body: "Every task is done. Enjoy the quiet.",
  },
};

function EmptyState({ variant = "no-tasks" }) {
  const copy = COPY[variant];

  return (
    <div className="empty-state">
      <svg
        className="empty-state__illustration"
        viewBox="0 0 120 120"
        fill="none"
        aria-hidden="true"
      >
        <rect x="24" y="18" width="72" height="90" rx="10" fill="var(--glass-surface-strong)" stroke="var(--border-subtle)" strokeWidth="2" />
        <line x1="40" y1="40" x2="80" y2="40" stroke="var(--color-teal-300)" strokeWidth="3" strokeLinecap="round" />
        <line x1="40" y1="54" x2="80" y2="54" stroke="var(--border-subtle)" strokeWidth="3" strokeLinecap="round" />
        <line x1="40" y1="68" x2="64" y2="68" stroke="var(--border-subtle)" strokeWidth="3" strokeLinecap="round" />
        <circle cx="86" cy="86" r="20" fill="var(--color-teal-500)" opacity="0.12" />
        <path
          d="M77 86l6 6 12-13"
          stroke="var(--color-teal-500)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <h3 className="empty-state__title">{copy.title}</h3>
      <p className="empty-state__body">{copy.body}</p>
    </div>
  );
}

export default EmptyState;
