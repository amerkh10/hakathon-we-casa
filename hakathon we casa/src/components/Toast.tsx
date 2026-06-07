import React, { useEffect } from 'react';
import { CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

export interface ToastItem {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning';
}

interface ToastProps {
  toasts: ToastItem[];
  removeToast: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, removeToast }) => {
  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-[350px] px-4 space-y-2 pointer-events-none">
      {toasts.map((toast) => (
        <ToastCard key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
};

const ToastCard: React.FC<{ toast: ToastItem; onClose: () => void }> = ({ toast, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const config = {
    success: {
      bg: 'bg-emerald-950/90 border-emerald-500/30 text-emerald-400',
      icon: <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />,
    },
    info: {
      bg: 'bg-blue-950/90 border-blue-500/30 text-blue-400',
      icon: <Info className="w-4 h-4 text-blue-400 flex-shrink-0" />,
    },
    warning: {
      bg: 'bg-amber-950/90 border-brand-orange/30 text-brand-orange',
      icon: <AlertTriangle className="w-4 h-4 text-brand-orange flex-shrink-0" />,
    },
  };

  const active = config[toast.type] || config.info;

  return (
    <div className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl border backdrop-blur-md shadow-lg transition-all duration-300 animate-slide-down ${active.bg}`}>
      <div className="flex items-center space-x-2.5">
        {active.icon}
        <p className="text-[11px] font-semibold tracking-wide leading-normal">{toast.message}</p>
      </div>
      <button 
        onClick={onClose}
        className="ml-3 p-0.5 rounded-md hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
