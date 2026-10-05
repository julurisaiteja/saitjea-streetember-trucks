"use client";
import Link from "next/link";
import { brand } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { items } from "@/lib/data";
import { useEffect } from "react";

export function SiteHeader() {
  const { count } = useCart();
  const { ids, hydrate } = useWishlist();
  useEffect(() => { hydrate(items); }, [hydrate, ids]);
  const bookPath = brand.isBooking ? "/book" : "/order";
  const bookLabel = brand.isBooking ? "Book" : "Order";
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-8">
        <Link href="/" className="font-display text-xl font-semibold">{brand.name}</Link>
        <nav className="flex flex-wrap items-center gap-3 text-sm">
          <Link href={`/${brand.nichePath}`} className="text-mute hover:text-ink">{brand.nicheLabel}</Link>
          <Link href="/shop" className="text-mute hover:text-ink">{brand.shopLabel}</Link>
          <Link href="/wishlist" className="text-mute hover:text-ink">Saved ({ids.size})</Link>
          <Link href={bookPath} className="text-mute hover:text-ink">{bookLabel}</Link>
          <Link href="/checkout" className="font-semibold text-accent">Cart ({count})</Link>
        </nav>
      </div>
    </header>
  );
}
