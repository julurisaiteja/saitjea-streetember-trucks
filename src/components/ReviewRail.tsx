import { reviewList } from "@/lib/data";

export function ReviewRail() {
  return (
    <section className="border-t border-line bg-surface/50 px-5 py-14 md:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-2xl">What clients say</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {reviewList.map((r) => (
            <blockquote key={r.name} className="border border-line p-5 text-sm">
              <p className="text-mute">"{r.quote}"</p>
              <footer className="mt-3 font-semibold">— {r.name}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
