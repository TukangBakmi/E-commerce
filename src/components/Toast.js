import { useEffect } from "react";

export default function Toast({ message, type = "success", show, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  const bgColor = type === "success" ? "bg-success" : type === "error" ? "bg-danger" : "bg-primary";

  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
      <div className={`toast show ${bgColor} text-white`}>
        <div className="toast-body d-flex justify-content-between align-items-center">
          <span>{message}</span>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={onClose}
          ></button>
        </div>
      </div>
    </div>
  );
}