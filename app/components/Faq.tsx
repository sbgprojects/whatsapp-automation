"use client";

import { useId, useState } from "react";

const ITEMS = [
  {
    q: "How long does Meta take to approve the templates?",
    a: "A day or two, usually. We submit them, not you. These are utility templates, which is the boring category Meta rarely argues with.",
  },
  {
    q: "Who pays for the messages?",
    a: "We do, for the first 30 days. After that it is about 11 paise a message, billed at cost. No markup on top like the marketing platforms charge.",
  },
  {
    q: "What if a real customer just does not reply?",
    a: "They get one reminder after three hours. If it stays silent the order cancels and they get a note saying they can reorder whenever. Real buyers answer. That is the whole premise.",
  },
  {
    q: "Does this slow down dispatch?",
    a: "Most replies land inside the hour. If you ship same day we will set the window to four hours instead of 24. You pick the number.",
  },
  {
    q: "Shopify or WooCommerce?",
    a: "Both.",
  },
  {
    q: "What about customers who do not use WhatsApp?",
    a: "Over 500 million Indians are on it. The few who are not fall straight through to your normal process, untouched.",
  },
  {
    q: "Will you message my customers about anything else?",
    a: "No. One message about their order, one reminder if they go quiet. We have no way to send campaigns because we did not build that.",
  },
];

function Row({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className="border-b border-line">
      <h3>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={id}
          className="flex w-full items-start justify-between gap-5 py-5 text-left"
        >
          <span className="font-display text-[17px] font-semibold leading-snug tracking-[-0.01em] text-ink">
            {q}
          </span>
          <span
            className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-line transition-all duration-300 ${
              open ? "rotate-45 border-ink bg-ink text-paper" : "text-ink-2"
            }`}
          >
            <svg viewBox="0 0 12 12" className="h-3 w-3">
              <path
                fill="currentColor"
                d="M5.25 0h1.5v12h-1.5z M0 5.25h12v1.5H0z"
              />
            </svg>
          </span>
        </button>
      </h3>
      <div
        id={id}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-[54ch] pb-5 pr-8 text-[15px] leading-[1.65] text-ink-2">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  return (
    <div className="border-t border-line">
      {ITEMS.map((item) => (
        <Row key={item.q} {...item} />
      ))}
    </div>
  );
}
