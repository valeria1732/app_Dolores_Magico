import React from 'react';
import './NotificationToast.css';

export default function NotificationToast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div className={`notification-toast ${toast.type || 'info'}`}>
      <span className="toast-icon">
        {toast.type === 'success' ? '✅' : toast.type === 'warning' ? '⚠️' : '🔔'}
      </span>
      <span className="toast-message">{toast.message}</span>
      <button className="toast-close" onClick={onClose} aria-label="Cerrar notificación">×</button>
    </div>
  );
}
