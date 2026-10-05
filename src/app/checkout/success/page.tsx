import Link from "next/link";
import { brand } from "@/lib/data";

export default function SuccessPage() {
  return (
    <div className="mx-auto max-w-lg px-5 py-20 text-center">
      <h1 className="font-display text-3xl">Payment successful</h1>
      <p className="mt-3 text-mute">Demo Stripe charge for {brand.name}. No real transaction occurred.</p>
      <div className="mt-8 flex justify-center gap-4 text-sm">
        <Link href="/shop" className="text-accent underline">Continue shopping</Link>
        <Link href="/" className="text-mute underline">Home</Link>
      </div>
    </div>
  );
}
