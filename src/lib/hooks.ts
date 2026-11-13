import { useEffect, useMemo, useRef, useState } from "react";
import type { Branch } from "../data/restaurant";

/** Reveal-on-scroll for elements marked with data-reveal. */
export function useRevealOnScroll() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    nodes.forEach((n) => io.observe(n));

    // Safety net: anything already inside the viewport (or scrolled to directly)
    // should never stay hidden if the observer callback is delayed.
    const settle = window.setTimeout(() => {
      nodes.forEach((n) => {
        const rect = n.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.98 && rect.bottom > 0) n.classList.add("is-in");
      });
    }, 900);

    return () => {
      io.disconnect();
      window.clearTimeout(settle);
    };
  }, []);
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function useInView<T extends HTMLElement>(rootMargin = "200px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((entries) => setInView(entries[0]?.isIntersecting ?? true), {
      rootMargin,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return { ref, inView };
}

export function useIsCompact() {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 820px)");
    setCompact(mq.matches);
    const onChange = () => setCompact(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return compact;
}

/** Minutes since midnight in Asia/Kolkata, refreshed every minute. */
function kolkataMinutes() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
  const [h, m] = parts.split(":").map(Number);
  return h * 60 + m;
}

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export function useOpenStatus(branch: Branch) {
  const [now, setNow] = useState(kolkataMinutes);
  useEffect(() => {
    const id = window.setInterval(() => setNow(kolkataMinutes()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  return useMemo(() => {
    const open = toMinutes(branch.opens);
    const close = toMinutes(branch.closes);
    const isOpen = now >= open && now < close;
    const untilClose = close - now;
    const untilOpen = (open - now + 1440) % 1440;
    return {
      isOpen,
      label: isOpen
        ? untilClose <= 60
          ? "Closing soon"
          : "Open now"
        : untilOpen <= 90
          ? "Opening soon"
          : "Closed",
    };
  }, [branch.opens, branch.closes, now]);
}

export const rupee = (value: number) => `₹${value.toLocaleString("en-IN")}`;
