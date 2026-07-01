import { useCallback, useRef, useState } from "react";

const DEFAULT_DURATION = 3200;

export function useToast() {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
    clearTimeout(timers.current[id]);
    delete timers.current[id];
  }, []);

  const showToast = useCallback(
    ({ message, action = null, duration = DEFAULT_DURATION }) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      setToasts((current) => [...current, { id, message, action }]);

      timers.current[id] = setTimeout(() => dismissToast(id), duration);

      return id;
    },
    [dismissToast]
  );

  return { toasts, showToast, dismissToast };
}
