"use client";

import { useEffect, useRef, useState } from "react";

const STOPS = [
  {
    at: "Under 5 minutes",
    title: "Message goes out",
    body: "Order lands, we send it. Nobody on your team touches anything.",
  },
  {
    at: "3 hours later",
    title: "One reminder",
    body: "Same message, once. We do not chase people past this.",
  },
  {
    at: "24 hours",
    title: "Order cancels itself",
    body: "Silence is a no. It never reaches your packing table.",
  },
];

export default function Timeline() {
  const ref = useRef<HTMLOListElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <ol ref={ref} className="relative mt-10 space-y-9 pl-11">
      <span
        aria-hidden="true"
        className="absolute left-[13px] top-2 w-px origin-top bg-line transition-transform duration-[1400ms] ease-out"
        style={{
          bottom: "1.5rem",
          transform: `scaleY(${shown ? 1 : 0})`,
        }}
      />

      {STOPS.map((stop, i) => (
        <li
          key={stop.at}
          className="reveal relative"
          data-shown={shown}
          style={{ transitionDelay: `${350 + i * 320}ms` }}
        >
          <span
            className={`absolute -left-11 top-1 grid h-[27px] w-[27px] place-items-center rounded-full border-2 transition-colors duration-500 ${
              i === STOPS.length - 1
                ? "border-ink bg-ink"
                : "border-line bg-paper"
            }`}
            style={{ transitionDelay: `${450 + i * 320}ms` }}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                i === STOPS.length - 1 ? "bg-wa" : "bg-ink-3"
              }`}
            />
          </span>

          <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
            {stop.at}
          </div>
          <h3 className="mt-1.5 font-display text-xl font-bold tracking-[-0.02em] text-ink">
            {stop.title}
          </h3>
          <p className="mt-1.5 max-w-[42ch] text-[15px] leading-[1.6] text-ink-2">
            {stop.body}
          </p>
        </li>
      ))}
    </ol>
  );
}
