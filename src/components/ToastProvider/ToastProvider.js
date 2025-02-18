import React from 'react';

export const ToastContext = React.createContext();
export const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const createToast = React.useCallback(({ message, variant }) => {
    if (!message && !variant) {
      throw Error('need to provide message and variant type');
    };

    if (!VARIANT_OPTIONS.includes(variant)) {
      throw Error('variants available are ["notice", "warning", "success", "error"]');
    };

    const nextToasts = [
      ...toasts,
      {
        id: crypto.randomUUID(),
        message,
        variant,
      },
    ];
    
    setToasts(nextToasts);
  }, [toasts]);

  const dismissToast = React.useCallback((toastId) => {
    const nextToasts = toasts.filter(toast => toast.id !== toastId);
    setToasts(nextToasts);
  }, [toasts]);

  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === 'Escape') {
        setToasts([]);
      }
    }
  
    window.addEventListener('keydown', handleKeyDown);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const value = React.useMemo(() => {
    return { toasts, createToast, dismissToast }
  }, [toasts, createToast, dismissToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  )
}

export default ToastProvider;
