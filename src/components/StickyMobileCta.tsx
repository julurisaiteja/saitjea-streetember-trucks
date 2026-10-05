"use client";
import Link from "next/link";
import { brand } from "@/lib/data";

export function StickyMobileCta() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-line bg-canvas/95 p-3 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-lg gap-2">
        <Link href={brand.stickyHref} className="flex-1 rounded-lg bg-accent py-3 text-center text-sm font-bold text-white">
          {brand.stickyCta}
        </Link>
        <Link href="/shop" className="rounded-lg border border-line px-4 py-3 text-sm font-semibold">
          Shop
        </Link>
      </div>
    </div>
  );
}
