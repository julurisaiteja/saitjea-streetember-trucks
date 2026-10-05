"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { CatalogItem } from "@/lib/data";
import { formatMoney } from "@/lib/data";
import { AddButton } from "@/components/AddButton";
import { WishlistButton } from "@/components/WishlistButton";

export function ProductDetail({ item, related }: { item: CatalogItem; related: CatalogItem[] }) {
  const [option, setOption] = useState(item.options[0] ?? "Standard");
  const [openFaq, setOpenFaq] = useState(0);
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden border border-line">
          <Image src={item.image} alt={item.title} fill className="object-cover" sizes="50vw" priority />
        </div>
        <div>
          <Link href="/shop" className="text-sm text-mute">← Shop</Link>
          <p className="mt-3 text-xs uppercase tracking-widest text-mute">{item.category}</p>
          <h1 className="font-display text-4xl">{item.title}</h1>
          <p className="mt-2 text-mute">{item.description}</p>
          <p className="mt-4 text-2xl font-bold text-accent">{formatMoney(item.price)}</p>
          <p className="text-sm text-mute">★ {item.rating} · {item.reviews} reviews</p>
          {item.options.length ? (
            <div className="mt-6">
              <p className="text-sm font-semibold">Options</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {item.options.map((o) => (
                  <button key={o} type="button" onClick={() => setOption(o)} className={`rounded-full border px-3 py-1 text-sm ${option === o ? "border-accent bg-accent/10" : "border-line"}`}>{o}</button>
                ))}
              </div>
              <p className="mt-2 text-xs text-mute">Selected: {option}</p>
            </div>
          ) : null}
          <div className="mt-6 flex flex-wrap gap-3">
            <AddButton item={item} label="Add to cart" />
            <WishlistButton item={item} />
          </div>
        </div>
      </div>
      <section className="mt-14 border-t border-line pt-10">
        <h2 className="font-display text-2xl">Specifications</h2>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          {Object.entries(item.specs).map(([k, v]) => (
            <div key={k} className="border border-line p-3 text-sm">
              <dt className="font-semibold">{k}</dt>
              <dd className="text-mute">{v}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="mt-12">
        <h2 className="font-display text-2xl">FAQ</h2>
        <div className="mt-4 space-y-2">
          {item.pdpFaqs.map((f, i) => (
            <button key={f.q} type="button" onClick={() => setOpenFaq(i)} className="w-full border border-line p-4 text-left text-sm">
              <span className="font-semibold">{f.q}</span>
              {openFaq === i ? <p className="mt-2 text-mute">{f.a}</p> : null}
            </button>
          ))}
        </div>
      </section>
      {related.length ? (
        <section className="mt-14">
          <h2 className="font-display text-2xl">Related</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <Link key={r.id} href={`/shop/${r.id}`} className="border border-line p-3 text-sm hover:border-accent">
                <p className="font-semibold">{r.title}</p>
                <p className="text-accent">{formatMoney(r.price)}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
