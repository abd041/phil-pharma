"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const ToastContext = createContext(null);
const WishlistContext = createContext(null);

const WISHLIST_KEY = "pp-wishlist";

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const pushToast = useCallback(
    (message, tone = "default") => {
      const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      setToasts((current) => [...current.slice(-3), { id, message, tone }]);
      window.setTimeout(() => dismiss(id), 2800);
    },
    [dismiss]
  );

  const value = useMemo(() => ({ pushToast, dismiss }), [pushToast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-stack" aria-live="polite" aria-relevant="additions">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.tone}`} role="status">
            <span>{toast.message}</span>
            <button type="button" onClick={() => dismiss(toast.id)} aria-label="Dismiss">
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    return {
      pushToast: () => {},
      dismiss: () => {},
    };
  }
  return ctx;
}

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState([]);
  const { pushToast } = useToast();

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(WISHLIST_KEY);
      if (raw) setIds(JSON.parse(raw));
    } catch {
      setIds([]);
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
    } catch {
      /* ignore quota */
    }
  }, [ids]);

  const toggle = useCallback(
    (product) => {
      setIds((current) => {
        const exists = current.includes(product.id);
        const next = exists ? current.filter((id) => id !== product.id) : [...current, product.id];
        pushToast(
          exists ? `Removed ${product.name} from wishlist` : `Saved ${product.name} to wishlist`,
          exists ? "muted" : "success"
        );
        return next;
      });
    },
    [pushToast]
  );

  const has = useCallback((id) => ids.includes(id), [ids]);

  const value = useMemo(() => ({ ids, toggle, has, count: ids.length }), [ids, toggle, has]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    return {
      ids: [],
      toggle: () => {},
      has: () => false,
      count: 0,
    };
  }
  return ctx;
}

export function UiProviders({ children }) {
  return (
    <ToastProvider>
      <WishlistProvider>{children}</WishlistProvider>
    </ToastProvider>
  );
}

export default UiProviders;
