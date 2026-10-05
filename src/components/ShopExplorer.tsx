"use client";
/* shop-chrome:streetember-trucks */
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { brand, categories, formatMoney, items, type CatalogItem } from "@/lib/data";
import { AddButton } from "@/components/AddButton";
import { WishlistButton } from "@/components/WishlistButton";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating";

export function ShopExplorer() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | "all">("all");
  const [sort, setSort] = useState<SortKey>("featured");

  const filtered = useMemo(() => {
    let list: CatalogItem[] = [...items];
    if (cat !== "all") list = list.filter((i) => i.category === cat);
    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter((i) => i.title.toLowerCase().includes(s) || i.description.toLowerCase().includes(s));
    }
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [q, cat, sort]);

  return (
    <div data-style={brand.style}>
      <div className="flex flex-col gap-4 border-2 border-dashed border-accent/50 bg-surface/70 p-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-4xl text-accent rotate-[-1deg]">{brand.shopLabel}</h1>
          <p className="mt-1 text-sm text-mute">{filtered.length} of {items.length} items</p>
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Find street eats…"
          className="w-full border-2 border-accent2 bg-canvas px-3 py-2 text-sm font-bold md:max-w-xs"
        />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={() => setCat("all")} className={`rounded-full px-3 py-1 text-xs font-semibold ${cat === "all" ? "bg-accent text-white" : "border border-line"}`}>All</button>
        {categories.map((c) => (
          <button key={c} type="button" onClick={() => setCat(c)} className={`rounded-full px-3 py-1 text-xs font-semibold ${cat === c ? "bg-accent text-white" : "border border-line"}`}>{c}</button>
        ))}
      </div>
      <div className="mt-4">
        <label className="text-xs text-mute">Sort</label>
        <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="ml-2 rounded border border-line bg-surface px-2 py-1 text-sm">
          <option value="featured">Featured</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
          <option value="rating">Top rated</option>
        </select>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((item) => (
          <article key={item.id} className="border border-line bg-surface p-3 anim-rise">
            <Link href={`/shop/${item.id}`} className="block">
              <div className="relative aspect-square overflow-hidden">
                <Image src={item.image} alt={item.title} fill className="object-cover transition duration-500 hover:scale-105" sizes="25vw" />
              </div>
              <p className="mt-2 text-xs uppercase tracking-wide text-mute">{item.category}</p>
              <h2 className="font-semibold">{item.title}</h2>
              <p className="text-sm text-mute line-clamp-2">{item.description}</p>
              <p className="mt-1 text-xs">★ {item.rating} ({item.reviews})</p>
            </Link>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <span className="font-semibold text-accent">{formatMoney(item.price)}</span>
              <div className="flex gap-2">
                <WishlistButton item={item} />
                <AddButton item={item} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
