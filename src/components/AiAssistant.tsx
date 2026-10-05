"use client";
import { useState } from "react";
import { aiFaqs } from "@/lib/data";

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open ? (
        <div className="mb-3 w-80 rounded-2xl border border-line bg-surface p-4 shadow-xl anim-rise">
          <p className="text-xs font-semibold uppercase tracking-wide text-mute">AI assistant (demo)</p>
          <div className="mt-3 flex flex-col gap-2">
            {aiFaqs.map((f, i) => (
              <button
                key={f.q}
                type="button"
                onClick={() => setActive(i)}
                className={`rounded-lg px-3 py-2 text-left text-sm ${active === i ? "bg-accent/15 text-ink" : "text-mute hover:bg-surface"}`}
              >
                {f.q}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm">{aiFaqs[active].a}</p>
          <button type="button" className="mt-3 text-xs text-mute underline" onClick={() => setOpen(false)}>Close</button>
        </div>
      ) : null}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="rounded-full bg-accent px-5 py-3 text-sm font-bold text-white shadow-lg anim-pulse"
      >
        Ask AI
      </button>
    </div>
  );
}
