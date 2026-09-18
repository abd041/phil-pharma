"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import ScrollToTop from "@/components/ScrollToTop";

const ToastContext = createContext(null);
const WishlistContext = createContext(null);
const CartContext = createContext(null);

const WISHLIST_KEY = "pp-wishlist";
const CART_KEY = "pp-cart";

function lineKey(slug, variantId) {
  return `${slug}::${variantId}`;
}

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
            <button type="button" onClick={() => dismiss(toast.id)} aria-label="Dismiss notification">
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
      const exists = ids.includes(product.id);
      setIds((current) =>
        current.includes(product.id)
          ? current.filter((id) => id !== product.id)
          : [...current, product.id]
      );
      pushToast(
        exists ? `Removed ${product.name} from wishlist` : `Saved ${product.name} to wishlist`,
        exists ? "muted" : "success"
      );
    },
    [ids, pushToast]
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

export function CartProvider({ children }) {
  const [lines, setLines] = useState([]);
  const [ready, setReady] = useState(false);
  const { pushToast } = useToast();

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CART_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setLines(
            parsed
              .map((line) => ({
                slug: String(line.slug || ""),
                variantId: String(line.variantId || ""),
                qty: Math.max(1, Math.min(20, Number(line.qty) || 1)),
              }))
              .filter((line) => line.slug && line.variantId)
          );
        }
      }
    } catch {
      setLines([]);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
    } catch {
      /* ignore quota */
    }
  }, [lines, ready]);

  const addItem = useCallback(
    ({ slug, variantId, qty = 1, name, silent = false }) => {
      const amount = Math.max(1, Math.min(20, Number(qty) || 1));
      setLines((current) => {
        const existing = current.find((line) => line.slug === slug && line.variantId === variantId);
        if (existing) {
          return current.map((line) =>
            line.slug === slug && line.variantId === variantId
              ? { ...line, qty: Math.min(20, line.qty + amount) }
              : line
          );
        }
        return [...current, { slug, variantId, qty: amount }];
      });
      if (!silent) {
        pushToast(`Added ${amount} × ${name || "item"} to cart`, "success");
      }
    },
    [pushToast]
  );

  const updateQty = useCallback((slug, variantId, qty) => {
    const nextQty = Math.max(0, Math.min(20, Number(qty) || 0));
    setLines((current) => {
      if (nextQty <= 0) {
        return current.filter((line) => !(line.slug === slug && line.variantId === variantId));
      }
      return current.map((line) =>
        line.slug === slug && line.variantId === variantId ? { ...line, qty: nextQty } : line
      );
    });
  }, []);

  const removeItem = useCallback(
    (slug, variantId, name) => {
      setLines((current) => current.filter((line) => !(line.slug === slug && line.variantId === variantId)));
      if (name) pushToast(`Removed ${name} from cart`, "muted");
    },
    [pushToast]
  );

  const clear = useCallback(
    (silent = false) => {
      setLines([]);
      if (!silent) pushToast("Cart cleared", "muted");
    },
    [pushToast]
  );

  const count = useMemo(() => lines.reduce((sum, line) => sum + line.qty, 0), [lines]);

  const value = useMemo(
    () => ({
      lines,
      ready,
      count,
      addItem,
      updateQty,
      removeItem,
      clear,
      lineKey,
    }),
    [lines, ready, count, addItem, updateQty, removeItem, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    return {
      lines: [],
      ready: true,
      count: 0,
      addItem: () => {},
      updateQty: () => {},
      removeItem: () => {},
      clear: () => {},
      lineKey,
    };
  }
  return ctx;
}

export function UiProviders({ children }) {
  return (
    <ToastProvider>
      <WishlistProvider>
        <CartProvider>
          <ScrollToTop />
          {children}
        </CartProvider>
      </WishlistProvider>
    </ToastProvider>
  );
}

export default UiProviders;
