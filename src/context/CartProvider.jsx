import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { CartContext } from "./cartContext";

const STORAGE_KEY = "shopease-cart-inr";

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function reducer(items, action) {
  switch (action.type) {
    case "add": {
      const { product, qty } = action;
      const existing = items.find((i) => i.id === product.id);
      if (existing) {
        return items.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [
        ...items,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          category: product.category,
          qty,
        },
      ];
    }
    case "setQty":
      return items.map((i) =>
        i.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i
      );
    case "remove":
      return items.filter((i) => i.id !== action.id);
    case "clear":
      return [];
    default:
      return items;
  }
}

export default function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, loadCart);
  const [toast, setToast] = useState(null);

  // Persist cart between visits
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable - cart just won't persist */
    }
  }, [items]);

  // Auto-hide toast
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(timer);
  }, [toast]);

  const addToCart = useCallback((product, qty = 1) => {
    dispatch({ type: "add", product, qty });
    setToast({ id: Date.now(), message: `Added “${product.title.slice(0, 32)}${product.title.length > 32 ? "…" : ""}” to cart` });
  }, []);

  const setQty = useCallback((id, qty) => dispatch({ type: "setQty", id, qty }), []);
  const removeFromCart = useCallback((id) => dispatch({ type: "remove", id }), []);
  const clearCart = useCallback(() => dispatch({ type: "clear" }), []);

  const value = useMemo(() => {
    const count = items.reduce((sum, i) => sum + i.qty, 0);
    const subtotal = items.reduce((sum, i) => sum + i.qty * i.price, 0);
    return { items, count, subtotal, addToCart, setQty, removeFromCart, clearCart, toast };
  }, [items, toast, addToCart, setQty, removeFromCart, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}