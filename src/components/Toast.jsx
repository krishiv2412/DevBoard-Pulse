import React from "react";
import { useEvents } from "../context/EventsContext";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export const ToastContainer = () => {
  const { toasts, removeToast } = useEvents();

  if (!toasts.length) return null;

  return (
    <div className="toast-container" role="region" aria-live="polite" aria-label="Notifications">
      {toasts.map((toast) => {
        const isSuccess = toast.type === "success";
        const isError = toast.type === "error";

        return (
          <div
            key={toast.id}
            className={`toast-item ${toast.type || "default"}`}
            onClick={() => removeToast(toast.id)}
          >
            <div className="toast-icon">
              {isSuccess ? (
                <CheckCircle2 size={18} className="text-emerald-400" />
              ) : isError ? (
                <AlertCircle size={18} className="text-rose-400" />
              ) : (
                <Info size={18} className="text-cyan-400" />
              )}
            </div>
            <div className="toast-message">{toast.message}</div>
            <button
              className="toast-close"
              aria-label="Dismiss notification"
              onClick={(e) => {
                e.stopPropagation();
                removeToast(toast.id);
              }}
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
