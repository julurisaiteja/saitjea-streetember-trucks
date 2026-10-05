"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type TruckStatus = "rolling" | "serving" | "restock";

const trucks = [
  { id: "ember", name: "Ember Cart", zone: "Downtown", grid: { row: 1, col: 2 }, base: 12, status: "serving" as TruckStatus },
  { id: "smoke", name: "Smoke Lane", zone: "Arts District", grid: { row: 2, col: 0 }, base: 18, status: "rolling" as TruckStatus },
  { id: "night", name: "Night Bite", zone: "Waterfront", grid: { row: 0, col: 3 }, base: 9, status: "restock" as TruckStatus },
];

const statusLabel: Record<TruckStatus, string> = {
  rolling: "En route",
  serving: "Serving now",
  restock: "Restocking",
};

const statusClass: Record<TruckStatus, string> = {
  rolling: "bg-accent2/20 text-accent2",
  serving: "bg-accent/30 text-accent",
  restock: "bg-mute/20 text-mute",
};

export default function LocatorPage() {
  const [etas, setEtas] = useState(trucks.map((t) => t.base));
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setTick((n) => n + 1);
      setEtas((prev) =>
        prev.map((m, i) => {
          const status = trucks[i].status;
          if (status === "serving") return Math.max(0, m - 1);
          if (status === "restock") return Math.min(25, m + 1);
          return Math.max(5, m + (Math.random() > 0.5 ? -1 : 1));
        }),
      );
    }, 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <div data-style="graffiti-street" className="spray mx-auto max-w-5xl px-5 py-16 md:px-8">
      <h1 className="font-display text-5xl text-accent tag">Truck locator</h1>
      <p className="mt-2 text-mute">
        City grid demo — ETAs tick every 2s. Order ahead locks to a truck id.
      </p>
      <p className="mt-1 text-xs text-mute/80" aria-live="polite">
        Live refresh #{tick}
      </p>

      <div className="mt-10 halftone-dark rounded-lg border-2 border-accent p-4">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-accent2">Sector map</p>
        <div className="grid grid-cols-4 gap-2 aspect-[4/3] max-h-72">
          {Array.from({ length: 12 }, (_, i) => {
            const row = Math.floor(i / 4);
            const col = i % 4;
            const onCell = trucks.find((t) => t.grid.row === row && t.grid.col === col);
            return (
              <div
                key={i}
                className={`relative flex items-center justify-center border border-border/60 text-[10px] ${onCell ? "bg-surface" : "bg-bg/40"}`}
              >
                {onCell ? (
                  <span className="font-display text-accent anim-sway">{onCell.name.split(" ")[0]}</span>
                ) : (
                  <span className="text-mute/30">·</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {trucks.map((t, i) => (
          <article key={t.id} className="border-2 border-accent bg-surface p-5 anim-rise">
            <div className="flex items-start justify-between gap-2">
              <p className="font-display text-2xl text-accent2">{t.name}</p>
              <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${statusClass[t.status]}`}>
                {statusLabel[t.status]}
              </span>
            </div>
            <p className="text-sm text-mute">{t.zone}</p>
            <p className="mt-1 text-xs text-mute">
              Grid R{t.grid.row + 1} · C{t.grid.col + 1}
            </p>
            <p className="mt-4 font-display text-3xl font-bold text-fg">
              {t.status === "serving" ? "Here" : `${etas[i]} min`}
              <span className="ml-2 text-sm font-normal text-mute anim-pulse">ETA</span>
            </p>
            <Link
              href={`/order?truck=${t.id}`}
              className="mt-4 inline-block bg-accent px-4 py-2 text-sm font-bold text-black hover:bg-accent2"
            >
              Order ahead · {t.id}
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
