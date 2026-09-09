"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

/** How long the finished thread stays on screen before the loop restarts. */
const HOLD_MS = 3200;

type Node =
  | { t: "typing"; ms: number }
  | { t: "in"; ms: number; body: ReactNode; time: string }
  | { t: "buttons"; ms: number }
  | { t: "tap"; ms: number; which: "yes" | "no" }
  | { t: "out"; ms: number; text: string; time: string }
  | { t: "divider"; ms: number; text: string }
  | { t: "status"; ms: number; text: string; tone: "good" | "bad" };

const orderCard = (
  <>
    <p>Hi Ananya, thanks for ordering from Kaya Wear.</p>
    <div className="my-2 rounded-lg bg-black/[0.045] px-2.5 py-2 font-mono text-[12.5px] leading-[1.7] text-ink/85">
      <div>Ribbed Cotton Top (M)</div>
      <div>Order #4127</div>
      <div className="font-medium">₹1,299 · Cash on Delivery</div>
    </div>
    <p>Please confirm this order so we can ship it.</p>
  </>
);

const reminderCard = (
  <p>
    Hi Ananya, we still haven&apos;t heard back on order #4127 (₹1,299). Please
    confirm so we can ship it today.
  </p>
);

const opening: Node[] = [
  { t: "typing", ms: 750 },
  { t: "in", ms: 1150, body: orderCard, time: "10:42" },
  { t: "buttons", ms: 850 },
];

const SCENARIOS = {
  confirm: {
    tab: "They confirm",
    caption: "Goes to dispatch like any other order. You do nothing.",
    nodes: [
      ...opening,
      { t: "tap", ms: 700, which: "yes" },
      { t: "out", ms: 750, text: "Yes, ship it", time: "10:47" },
      {
        t: "status",
        ms: 800,
        text: "Confirmed. Moved to today's dispatch.",
        tone: "good",
      },
    ] as Node[],
  },
  cancel: {
    tab: "They cancel",
    caption: "Order cancels itself in your store. Nothing gets packed.",
    nodes: [
      ...opening,
      { t: "tap", ms: 700, which: "no" },
      { t: "out", ms: 750, text: "No, cancel", time: "10:47" },
      {
        t: "status",
        ms: 800,
        text: "Cancelled in your store. ₹250 you did not spend.",
        tone: "bad",
      },
    ] as Node[],
  },
  silent: {
    tab: "No reply",
    caption: "The one that saves you the most money.",
    nodes: [
      ...opening,
      { t: "divider", ms: 900, text: "3 hours later" },
      { t: "in", ms: 1500, body: reminderCard, time: "13:42" },
      { t: "divider", ms: 950, text: "24 hours later" },
      {
        t: "status",
        ms: 850,
        text: "No reply. Order cancelled automatically.",
        tone: "bad",
      },
    ] as Node[],
  },
} as const;

type Key = keyof typeof SCENARIOS;
const KEYS = Object.keys(SCENARIOS) as Key[];

function Ticks() {
  return (
    <svg viewBox="0 0 16 11" className="h-[11px] w-4 shrink-0 text-[#4fc3f7]">
      <path
        fill="currentColor"
        d="M11.07.65 5.4 6.32 3.6 4.5l-.9.9 2.7 2.7 6.57-6.57zM15.35.65 9.68 6.32l-.72-.72-.9.9 1.62 1.62L15.35 1.55z"
      />
      <path fill="currentColor" d="m.65 5.4 2.7 2.7.9-.9-2.7-2.7z" />
    </svg>
  );
}

export default function PhoneDemo() {
  const [key, setKey] = useState<Key>("confirm");
  const [stage, setStage] = useState(0);
  const reduced = useRef(false);

  const nodes = SCENARIOS[key].nodes;

  useEffect(() => {
    reduced.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    setStage(reduced.current ? nodes.length : 0);
  }, [key, nodes.length]);

  useEffect(() => {
    if (reduced.current) return;
    const step = nodes[stage];
    const wait = step ? step.ms : HOLD_MS;
    const id = window.setTimeout(
      () => setStage((s) => (s >= nodes.length ? 0 : s + 1)),
      wait,
    );
    return () => window.clearTimeout(id);
  }, [stage, nodes]);

  const visible = useMemo(() => nodes.slice(0, stage), [nodes, stage]);
  const tapped = visible.find((n) => n.t === "tap");
  const buttonsShown = visible.some((n) => n.t === "buttons");

  return (
    <div className="w-full">
      <div
        role="tablist"
        aria-label="What the customer does"
        className="mx-auto mb-5 flex w-full max-w-[340px] rounded-full border border-line bg-paper-2/70 p-1"
      >
        {KEYS.map((k) => (
          <button
            key={k}
            role="tab"
            aria-selected={key === k}
            onClick={() => setKey(k)}
            className={`flex-1 rounded-full px-2 py-2 text-[12.5px] font-semibold tracking-[-0.01em] transition-colors duration-200 ${
              key === k
                ? "bg-ink text-paper"
                : "text-ink-2 hover:text-ink"
            }`}
          >
            {SCENARIOS[k].tab}
          </button>
        ))}
      </div>

      <div className="mx-auto w-full max-w-[330px]">
        <div className="rounded-[2.4rem] border border-black/10 bg-ink p-2.5 shadow-[0_40px_80px_-30px_rgba(20,18,15,0.55),0_0_0_1px_rgba(255,255,255,0.06)_inset]">
          <div className="overflow-hidden rounded-[1.9rem] bg-[#efe7de]">
            <div className="flex items-center justify-between bg-[#008069] px-4 pt-2.5 pb-1 font-mono text-[10.5px] text-white/90">
              <span>9:41</span>
              <span className="flex items-center gap-[3px]">
                <span className="inline-block h-2 w-[3px] rounded-sm bg-white/80" />
                <span className="inline-block h-2.5 w-[3px] rounded-sm bg-white/80" />
                <span className="inline-block h-3 w-[3px] rounded-sm bg-white/45" />
                <span className="ml-1 inline-block h-2.5 w-5 rounded-[3px] border border-white/60" />
              </span>
            </div>

            <div className="flex items-center gap-2.5 bg-[#008069] px-3 pb-2.5 text-white">
              <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 opacity-90">
                <path
                  fill="currentColor"
                  d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z"
                />
              </svg>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#c9a227] font-display text-[13px] font-bold text-white">
                K
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[13.5px] font-semibold leading-tight">
                  Kaya Wear
                </span>
                <span className="block text-[10.5px] leading-tight text-white/70">
                  Business account
                </span>
              </span>
            </div>

            <div className="grain relative flex h-[452px] flex-col justify-end gap-1.5 overflow-hidden px-3 pb-3.5 pt-3">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 z-10 h-9 bg-gradient-to-b from-[#efe7de] to-transparent"
              />
              {visible.map((node, i) => {
                if (node.t === "typing") {
                  if (i !== visible.length - 1) return null;
                  return (
                    <div
                      key={i}
                      className="animate-bubble-in flex w-fit items-center gap-1 rounded-2xl rounded-tl-md bg-white px-3.5 py-3 shadow-sm"
                    >
                      {[0, 1, 2].map((d) => (
                        <span
                          key={d}
                          className="typing-dot inline-block h-1.5 w-1.5 rounded-full bg-ink-3"
                          style={{ animationDelay: `${d * 0.16}s` }}
                        />
                      ))}
                    </div>
                  );
                }

                if (node.t === "in") {
                  return (
                    <div
                      key={i}
                      className="animate-bubble-in max-w-[85%] rounded-2xl rounded-tl-md bg-white px-3 py-2.5 text-[13.5px] leading-[1.5] text-ink shadow-sm"
                    >
                      {node.body}
                      <span className="mt-1 block text-right font-mono text-[10px] text-ink-3">
                        {node.time}
                      </span>
                    </div>
                  );
                }

                if (node.t === "buttons") {
                  return (
                    <div key={i} className="max-w-[85%] space-y-1">
                      {(
                        [
                          ["yes", "Yes, ship it"],
                          ["no", "No, cancel"],
                        ] as const
                      ).map(([id, label], bi) => {
                        const isTapped = tapped?.which === id;
                        const anyTapped = Boolean(tapped);
                        return (
                          <div
                            key={id}
                            className="animate-bubble-in relative overflow-hidden rounded-lg bg-white text-center shadow-sm"
                            style={{ animationDelay: `${bi * 90}ms` }}
                          >
                            <div
                              className={`px-3 py-2.5 text-[13.5px] font-medium transition-all duration-300 ${
                                isTapped
                                  ? "bg-[#008069]/10 text-[#008069]"
                                  : anyTapped
                                    ? "text-ink-3/60"
                                    : "text-[#027eb5]"
                              }`}
                            >
                              {label}
                            </div>
                            {isTapped && (
                              <span className="pointer-events-none absolute inset-0 grid place-items-center">
                                <span className="tap-ring block h-10 w-10 rounded-full bg-[#008069]/35" />
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                }

                if (node.t === "out") {
                  return (
                    <div
                      key={i}
                      className="animate-bubble-in ml-auto flex max-w-[80%] items-end gap-1.5 rounded-2xl rounded-tr-md bg-[#d9fdd3] px-3 py-2 text-[13.5px] text-ink shadow-sm"
                    >
                      <span>{node.text}</span>
                      <span className="flex shrink-0 items-center gap-0.5 pb-[1px] font-mono text-[10px] text-ink-3">
                        {node.time}
                        <Ticks />
                      </span>
                    </div>
                  );
                }

                if (node.t === "divider") {
                  return (
                    <div
                      key={i}
                      className="animate-fade-in mx-auto my-0.5 rounded-full bg-black/[0.07] px-3 py-1 font-mono text-[10.5px] tracking-wide text-ink-2"
                    >
                      {node.text}
                    </div>
                  );
                }

                if (node.t === "status") {
                  return (
                    <div
                      key={i}
                      className={`animate-bubble-in mt-1 flex items-center gap-2 rounded-xl px-3 py-2.5 text-[12.5px] font-semibold leading-snug ${
                        node.tone === "good"
                          ? "bg-wa-deep text-white"
                          : "bg-ink text-paper"
                      }`}
                    >
                      <span className="shrink-0 font-mono text-[10px] font-normal uppercase tracking-[0.12em] opacity-60">
                        store
                      </span>
                      {node.text}
                    </div>
                  );
                }

                return null;
              })}
            </div>
          </div>
        </div>

        <p
          key={key}
          className="animate-fade-in mx-auto mt-4 max-w-[300px] text-center text-[13px] leading-snug text-ink-2"
        >
          {SCENARIOS[key].caption}
        </p>
        <p className="mx-auto mt-2 max-w-[300px] text-center font-mono text-[10.5px] leading-snug text-ink-3">
          Example message. Your store&apos;s name, product and order number.
        </p>
      </div>

      <span className="sr-only" aria-live="off">
        {buttonsShown ? "Two reply buttons: Yes, ship it. No, cancel." : ""}
      </span>
    </div>
  );
}
