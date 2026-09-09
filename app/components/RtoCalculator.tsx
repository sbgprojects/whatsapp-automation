"use client";

import { useEffect, useRef, useState } from "react";
import { COST_PER_RTO, RTO_RATE, inr } from "@/app/lib/site";

const MIN = 20;
const MAX = 600;

export default function RtoCalculator() {
  const [orders, setOrders] = useState(120);
  const [intro, setIntro] = useState(0);
  const hostRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = hostRef.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      started.current = true;
      const id = requestAnimationFrame(() => setIntro(1));
      return () => cancelAnimationFrame(id);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / 1100);
          setIntro(1 - Math.pow(1 - p, 4));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const monthly = orders * 30;
  const returned = monthly * RTO_RATE;
  const cost = returned * COST_PER_RTO;
  const percent = ((orders - MIN) / (MAX - MIN)) * 100;

  return (
    <div ref={hostRef} className="rounded-3xl bg-white/[0.045] p-6 sm:p-8">
      <label
        htmlFor="orders"
        className="block font-mono text-[11px] uppercase tracking-[0.16em] text-white/45"
      >
        COD orders you ship a day
      </label>

      <div className="mt-2 flex items-baseline gap-2.5">
        <span className="font-display text-5xl font-extrabold tabular-nums tracking-[-0.03em] text-white sm:text-6xl">
          {orders}
        </span>
        <span className="text-sm text-white/45">a day</span>
      </div>

      <input
        id="orders"
        type="range"
        min={MIN}
        max={MAX}
        step={10}
        value={orders}
        onChange={(e) => setOrders(Number(e.target.value))}
        style={
          {
            "--track": `linear-gradient(to right, #25d366 ${percent}%, rgba(255,255,255,0.16) ${percent}%)`,
          } as React.CSSProperties
        }
        className="mt-6 w-full cursor-grab"
      />

      <dl className="mt-8 space-y-0">
        {[
          { label: "COD orders a month", value: inr(monthly * intro) },
          { label: "Come back to you", value: inr(returned * intro) },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex items-baseline justify-between gap-4 border-b border-white/10 py-3.5"
          >
            <dt className="text-[14.5px] text-white/55">{label}</dt>
            <dd className="font-mono text-lg tabular-nums text-white/90">
              {value}
            </dd>
          </div>
        ))}

        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 pt-5">
          <dt className="text-[14.5px] text-white/55">
            Cost of those round trips
          </dt>
          <dd className="font-display text-[2.1rem] font-extrabold tabular-nums leading-none tracking-[-0.03em] text-[#ff6b5e] sm:text-[2.6rem]">
            ₹{inr(cost * intro)}
            <span className="ml-1.5 align-middle text-[13px] font-semibold tracking-normal text-white/40">
              a month
            </span>
          </dd>
        </div>
      </dl>

      <p className="mt-7 border-t border-white/10 pt-5 font-mono text-[11.5px] leading-[1.75] text-white/40">
        Using 30% RTO and ₹250 a round trip. India runs 28 to 35% on COD, higher
        in fashion and footwear. Move the slider to your own number.
      </p>
    </div>
  );
}
