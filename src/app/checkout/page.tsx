"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { brand, formatMoney } from "@/lib/data";
import { useCart } from "@/lib/cart";

export default function CheckoutPage() {
  const { lines, subtotal, clear } = useCart();
  const [card, setCard] = useState("");
  const router = useRouter();

  const pay = () => {
    const digits = card.replace(/\s/g, "");
    if (digits.startsWith("4242")) {
      clear();
      router.push("/checkout/success");
    }
  };

  return (
    <div className="mx-auto max-w-lg px-5 py-14 md:px-8">
      <h1 className="font-display text-3xl">Checkout (demo)</h1>
      <p className="mt-2 text-sm text-mute">Test card 4242 4242 4242 4242 · Coupon {brand.coupon}</p>
      <ul className="mt-8 space-y-3 border-b border-line pb-6 text-sm">
        {lines.map((l) => (
          <li key={l.item.id} className="flex justify-between">
            <span>{l.item.title} × {l.qty}</span>
            <span>{formatMoney(l.item.price * l.qty)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 font-semibold">Total {formatMoney(subtotal)}</p>
      <label className="mt-8 block text-sm">
        Card number
        <input className="mt-2 w-full rounded-lg border border-line bg-surface px-3 py-2" placeholder="4242 4242 4242 4242" value={card} onChange={(e) => setCard(e.target.value)} />
      </label>
      <button type="button" onClick={pay} className="mt-6 w-full rounded-lg bg-accent py-3 font-semibold text-white">Pay with Stripe (demo)</button>
    </div>
  );
}
