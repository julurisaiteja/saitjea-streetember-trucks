"use client";
import { brand } from "@/lib/data";
import { useState } from "react";

export function PromoStrip() {
  const [copied, setCopied] = useState(false);
  return (
    <div className="border-b border-line bg-accent/10 px-4 py-2 text-center text-sm">
      <span className="text-mute">Demo offer — use code </span>
      <button
        type="button"
        className="font-bold text-accent"
        onClick={() => {
          navigator.clipboard?.writeText(brand.coupon);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
      >
        {brand.coupon}
      </button>
      {copied ? <span className="ml-2 text-mute">Copied</span> : null}
    </div>
  );
}
