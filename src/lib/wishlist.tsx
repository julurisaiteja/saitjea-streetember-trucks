"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { CatalogItem } from "./data";

type WishCtx = {
  ids: Set<string>;
  toggle: (item: CatalogItem) => void;
  has: (id: string) => boolean;
  items: CatalogItem[];
  hydrate: (all: CatalogItem[]) => void;
};

const Ctx = createContext<WishCtx | null>(null);

export function WishlistProvider({ slug, children }: { slug: string; children: React.ReactNode }) {
  const key = `diamond-wish-${slug}`;
  const [ids, setIds] = useState<Set<string>>(new Set());
  const [resolved, setResolved] = useState<CatalogItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setIds(new Set(JSON.parse(raw)));
    } catch { /* */ }
  }, [key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify([...ids]));
  }, [ids, key]);

  const toggle = useCallback((item: CatalogItem) => {
    setIds((prev) => {
      const next = new Set(prev);
      if (next.has(item.id)) next.delete(item.id);
      else next.add(item.id);
      return next;
    });
  }, []);

  const has = useCallback((id: string) => ids.has(id), [ids]);

  const hydrate = useCallback((all: CatalogItem[]) => {
    setResolved(all.filter((i) => ids.has(i.id)));
  }, [ids]);

  const value = useMemo(
    () => ({ ids, toggle, has, items: resolved, hydrate }),
    [ids, toggle, has, resolved]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useWishlist() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useWishlist outside provider");
  return ctx;
}
