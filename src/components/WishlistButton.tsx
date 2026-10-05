"use client";
import type { CatalogItem } from "@/lib/data";
import { useWishlist } from "@/lib/wishlist";

export function WishlistButton({ item }: { item: CatalogItem }) {
  const { has, toggle } = useWishlist();
  const on = has(item.id);
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => toggle(item)}
      className={`rounded-md border px-3 py-1.5 text-sm ${on ? "border-accent bg-accent/10 text-accent" : "border-line"}`}
    >
      {on ? "Saved" : "Save"}
    </button>
  );
}
