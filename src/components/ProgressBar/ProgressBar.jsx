import "./ProgressBar.css";

function ProgressBar({ completed, total }) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="progress">
      <div className="progress__labels">
        <span className="progress__count">
          {completed} of {total} done
        </span>
        <span className="progress__percent">{percent}%</span>
      </div>
      <div
        className="progress__track"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Task completion progress"
      >
        <div className="progress__fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

export default ProgressBar;
