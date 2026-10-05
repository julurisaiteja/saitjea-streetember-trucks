"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { CatalogItem } from "./data";

export type CartLine = { item: CatalogItem; qty: number };

type CartCtx = {
  lines: CartLine[];
  add: (item: CatalogItem) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "diamond-cart";

export function CartProvider({ slug, children }: { slug: string; children: React.ReactNode }) {
  const storageKey = `${KEY}-${slug}`;
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setLines(JSON.parse(raw));
    } catch { /* ignore */ }
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(lines));
  }, [lines, storageKey]);

  const add = useCallback((item: CatalogItem) => {
    setLines((prev) => {
      const hit = prev.find((l) => l.item.id === item.id);
      if (hit) return prev.map((l) => (l.item.id === item.id ? { ...l, qty: l.qty + 1 } : l));
      return [...prev, { item, qty: 1 }];
    });
  }, []);

  const remove = useCallback((id: string) => setLines((p) => p.filter((l) => l.item.id !== id)), []);
  const setQty = useCallback((id: string, qty: number) => {
    setLines((p) => p.map((l) => (l.item.id === id ? { ...l, qty: Math.max(1, qty) } : l)).filter((l) => l.qty > 0));
  }, []);
  const clear = useCallback(() => setLines([]), []);

  const count = useMemo(() => lines.reduce((s, l) => s + l.qty, 0), [lines]);
  const subtotal = useMemo(() => lines.reduce((s, l) => s + l.item.price * l.qty, 0), [lines]);

  const value = useMemo(() => ({ lines, add, remove, setQty, clear, count, subtotal }), [lines, add, remove, setQty, clear, count, subtotal]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart outside provider");
  return ctx;
}
