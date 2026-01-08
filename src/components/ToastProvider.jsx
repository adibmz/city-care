import { createContext, useCallback, useMemo, useState } from 'react';
import { createId } from '../utils/reportHelpers';

export const ToastContext = createContext({
  push: () => {}
});

/**
 * @param {{ children: import('react').ReactNode }} props
 */
export function ToastProvider(props) {
  const { children } = props;
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const push = useCallback(
    (toast) => {
      const id = createId('toast');
      const next = {
        id,
        type: toast.type || 'info',
        message: toast.message
      };
      setToasts((prev) => [...prev, next]);
      setTimeout(() => remove(id), 3500);
    },
    [remove]
  );

  const value = useMemo(() => ({ push }), [push]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="fixed bottom-4 right-4 z-50 flex max-w-sm flex-col gap-2"
        aria-live="polite"
        aria-atomic="true"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className={`rounded-xl border px-4 py-3 text-sm shadow-soft backdrop-blur ${
              toast.type === 'success'
                ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                : toast.type === 'error'
                ? 'border-rose-200 bg-rose-50 text-rose-900'
                : 'border-slate-200 bg-white/90 text-slate-700'
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
