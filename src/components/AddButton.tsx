"use client";
import type { CatalogItem } from "@/lib/data";
import { useCart } from "@/lib/cart";

export function AddButton({ item, label = "Add" }: { item: CatalogItem; label?: string }) {
  const { add } = useCart();
  return (
    <button
      type="button"
      onClick={() => add(item)}
      className="rounded-md border border-line bg-surface px-3 py-1.5 text-sm font-semibold transition hover:bg-accent hover:text-white"
    >
      {label}
    </button>
  );
}
