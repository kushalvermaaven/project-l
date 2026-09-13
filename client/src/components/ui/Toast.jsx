import React, { useContext, useEffect, useState } from 'react';
import { ToastContext } from '../../contexts/ToastContext';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

const ToastItem = ({ toast, onClose }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => Math.max(0, prev - (100 / (toast.duration / 50))));
    }, 50);
    return () => clearInterval(timer);
  }, [toast.duration]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-400" />,
    error: <XCircle className="w-5 h-5 text-red-400" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-400" />,
    info: <Info className="w-5 h-5 text-cyan-400" />
  };

  const bgColors = {
    success: "bg-green-400",
    error: "bg-red-400",
    warning: "bg-amber-400",
    info: "bg-cyan-400"
  };

  return (
    <div className="relative overflow-hidden bg-[#1a1a2e]/90 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-xl flex items-start gap-3 w-80 animate-in slide-in-from-right-8 fade-in duration-300">
      <div className="flex-shrink-0 mt-0.5">{icons[toast.type]}</div>
      <div className="flex-1 mr-4">
        <p className="text-sm text-[#f0f0f5]">{toast.message}</p>
      </div>
      <button onClick={() => onClose(toast.id)} className="text-[#a0a0b8] hover:text-white transition-colors flex-shrink-0">
        <X className="w-4 h-4" />
      </button>
      <div className="absolute bottom-0 left-0 h-1 bg-white/5 w-full">
        <div className={`h-full ${bgColors[toast.type]} transition-all duration-75 ease-linear`} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

const Toast = () => {
  const { toasts, removeToast } = useContext(ToastContext) || { toasts: [], removeToast: () => {} };

  if (!toasts?.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      {toasts.map(toast => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastItem toast={toast} onClose={removeToast} />
        </div>
      ))}
    </div>
  );
};

export default Toast;
