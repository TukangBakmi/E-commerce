import { useEffect, useState } from "react";

export default function Toast({ message, type = "success", show, onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      setOpacity(1);
      setShake(true);
      
      const shakeTimer = setTimeout(() => {
        setShake(false);
      }, 500);
      
      const fadeTimer = setTimeout(() => {
        setOpacity(0);
      }, 1000);
      
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 3000);
      
      return () => {
        clearTimeout(shakeTimer);
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [show, onClose]);

  if (!isVisible) return null;

  const bgColor = type === "success" ? "bg-success" : type === "error" ? "bg-danger" : "bg-primary";

  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
      <div 
        className={`toast show ${bgColor} text-white`}
        style={{
          opacity: opacity,
          transition: 'opacity 2s ease-out',
          animation: shake ? 'shake 0.5s ease-in-out' : 'none'
        }}
      >
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