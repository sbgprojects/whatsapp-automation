"use client";

import { useEffect, useState } from "react";
import { whatsappHref } from "@/app/lib/site";

export default function StickyCta() {
  const [past, setPast] = useState(false);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > 720);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const target = document.getElementById("final-cta");
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setAtEnd(entry.isIntersecting),
      { threshold: 0.08 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const show = past && !atEnd;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-line bg-paper/85 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md transition-all duration-300 lg:hidden ${
        show
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={show ? 0 : -1}
        aria-hidden={!show}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-wa px-6 py-3.5 font-display text-[16px] font-bold tracking-[-0.01em] text-ink active:scale-[0.985]"
      >
        Set it up on my store
      </a>
      <p className="mt-2 text-center text-[11.5px] text-ink-3">
        Free for 30 days. No card.
      </p>
    </div>
  );
}
