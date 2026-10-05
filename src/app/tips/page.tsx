import { counselTips, brand } from "@/lib/data";

export default function TipsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-8" data-style={brand.style}>
      <h1 className="font-display text-4xl">Tips</h1>
      <p className="mt-2 text-mute">Practical notes for {brand.name} — demo copy only.</p>
      <ul className="mt-10 space-y-6">
        {counselTips.map((t) => (
          <li key={t.title} className="border border-line p-5">
            <h2 className="font-semibold">{t.title}</h2>
            <p className="mt-2 text-sm text-mute">{t.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
