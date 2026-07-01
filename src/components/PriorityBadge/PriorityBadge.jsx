import "./PriorityBadge.css";

const LABELS = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

function PriorityBadge({ priority }) {
  return <span className={`priority-badge priority-badge--${priority}`}>{LABELS[priority]}</span>;
}

export default PriorityBadge;
