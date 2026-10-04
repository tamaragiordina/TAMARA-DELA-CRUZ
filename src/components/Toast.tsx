import React from 'react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 glass-surface border border-subtle text-slate-200 px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-xs font-mono animate-in fade-in slide-in-from-bottom-3 duration-200">
      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF7A]"></span>
      <span>{message}</span>
    </div>
  );
};
