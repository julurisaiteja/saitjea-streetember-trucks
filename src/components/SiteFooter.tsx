import { brand } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="border-t border-line px-5 py-10 text-center text-xs text-mute md:px-8">
      <p>{brand.name} — demo storefront. Payments are simulated; card 4242 4242 4242 4242 succeeds in checkout demo only.</p>
      <p className="mt-2">No legal, medical, or outcome guarantees. English copy for portfolio demonstration.</p>
    </footer>
  );
}
