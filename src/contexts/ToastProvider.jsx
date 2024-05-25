import { useState } from "react";
import Toast from "../components/molecules/Toast";
import { ToastContext } from "./ToastContext";

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (content, type = "info", autocloseDelay = 5000) => {
    const id = Date.now();
    setToasts([...toasts, { id, content, type }]);
    setTimeout(() => removeToast(id), autocloseDelay);
  };

  const removeToast = (id) => {
    setToasts((toasts) => toasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={addToast}>
      {children}

      <div className="pointer-events-none absolute bottom-8 end-0 start-0 z-50 flex flex-col items-center justify-center gap-1">
        {toasts.map((toast) => (
          <Toast
            className="pointer-events-auto"
            key={toast.id}
            variant={toast.type}
            onClose={() => removeToast(toast.id)}
          >
            {toast.content}
          </Toast>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
