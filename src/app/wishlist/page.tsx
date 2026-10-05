"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { items, formatMoney } from "@/lib/data";
import { useWishlist } from "@/lib/wishlist";
import { AddButton } from "@/components/AddButton";

export default function WishlistPage() {
  const { items: saved, hydrate } = useWishlist();
  useEffect(() => { hydrate(items); }, [hydrate]);
  return (
    <div className="mx-auto max-w-4xl px-5 py-14 md:px-8">
      <h1 className="font-display text-4xl">Saved</h1>
      <p className="mt-2 text-sm text-mute">Wishlist stored in your browser for this demo.</p>
      {saved.length === 0 ? (
        <p className="mt-10 text-mute"><Link href="/shop" className="text-accent underline">Browse shop</Link> to save items.</p>
      ) : (
        <ul className="mt-10 space-y-4">
          {saved.map((item) => (
            <li key={item.id} className="flex gap-4 border border-line p-3">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden">
                <Image src={item.image} alt="" fill className="object-cover" sizes="80px" />
              </div>
              <div className="flex flex-1 flex-col justify-between sm:flex-row sm:items-center">
                <div>
                  <Link href={`/shop/${item.id}`} className="font-semibold hover:text-accent">{item.title}</Link>
                  <p className="text-sm text-accent">{formatMoney(item.price)}</p>
                </div>
                <AddButton item={item} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
