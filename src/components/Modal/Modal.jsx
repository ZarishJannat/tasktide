import { useEffect, useRef } from "react";
import "./Modal.css";

function Modal({ title, message, confirmLabel = "Confirm", onConfirm, onCancel, danger = false }) {
  const confirmRef = useRef(null);

  useEffect(() => {
    confirmRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") onCancel();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  return (
    <div className="modal-overlay" onMouseDown={onCancel}>
      <div
        className="modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h3 id="modal-title" className="modal__title">
          {title}
        </h3>
        <p className="modal__message">{message}</p>
        <div className="modal__actions">
          <button type="button" className="modal__btn modal__btn--ghost" onClick={onCancel}>
            Cancel
          </button>
          <button
            type="button"
            ref={confirmRef}
            className={`modal__btn ${danger ? "modal__btn--danger" : "modal__btn--primary"}`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
