"use client";
import { brand } from "@/lib/data";
import { useState } from "react";

export default function OrderPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="mx-auto max-w-lg px-5 py-14 md:px-8" data-style={brand.style}>
      <h1 className="font-display text-4xl">Order</h1>
      <p className="mt-2 text-mute">{brand.tagline}</p>
      {sent ? (
        <p className="mt-10 rounded-lg border border-line bg-surface p-6 text-sm">Request received (demo). We will not contact you.</p>
      ) : (
        <form
          className="mt-10 space-y-4"
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
        >
          <input required className="w-full rounded-lg border border-line bg-surface px-3 py-2" placeholder="Name" />
          <input required type="email" className="w-full rounded-lg border border-line bg-surface px-3 py-2" placeholder="Email" />
          <textarea className="w-full rounded-lg border border-line bg-surface px-3 py-2" rows={4} placeholder="Notes" />
          <button type="submit" className="w-full rounded-lg bg-accent py-3 font-semibold text-white">Submit (demo)</button>
        </form>
      )}
    </div>
  );
}
