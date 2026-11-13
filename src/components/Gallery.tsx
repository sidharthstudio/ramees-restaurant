import { useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { GALLERY } from "../data/restaurant";

export default function Gallery() {
  const total = GALLERY.length;
  const [index, setIndex] = useState(0);
  const dragStart = useRef<number | null>(null);

  const go = (dir: number) => setIndex((i) => (i + dir + total) % total);

  const offsetFor = (i: number) => {
    let d = i - index;
    if (d > total / 2) d -= total;
    if (d < -total / 2) d += total;
    return d;
  };

  const handlePointerDown = (e: ReactPointerEvent) => {
    dragStart.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerUp = (e: ReactPointerEvent) => {
    if (dragStart.current === null) return;
    const delta = e.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(delta) > 46) go(delta < 0 ? 1 : -1);
  };

  return (
    <section className="section gallery" id="gallery">
      <div className="container">
        <div className="section__head section__head--center">
          <div>
            <p className="eyebrow">From the pass</p>
            <h2 data-reveal>
              Smoke, spice
              <br />
              and <em>steam.</em>
            </h2>
          </div>
        </div>
      </div>

      <div
        className="coverflow"
        role="group"
        aria-roledescription="carousel"
        aria-label="Photographs from Ramees Restaurant"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            go(1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            go(-1);
          }
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <div className="coverflow__stage">
          {GALLERY.map((photo, i) => {
            const d = offsetFor(i);
            const abs = Math.abs(d);
            return (
              <button
                type="button"
                key={photo.caption}
                className={`coverflow__card ${d === 0 ? "is-active" : ""}`}
                style={{
                  transform: `translate(-50%, -50%) translateX(${d * 54}%) translateZ(${-abs * 120}px) rotateY(${d * -25}deg) scale(${1 - abs * 0.05})`,
                  opacity: abs > 3 ? 0 : Math.max(0.1, 1 - abs * 0.16),
                  zIndex: 30 - abs,
                  pointerEvents: abs > 3 ? "none" : "auto",
                }}
                onClick={() => setIndex(i)}
                aria-label={`${photo.caption}${d === 0 ? " (current photo)" : ""}`}
                aria-current={d === 0}
                tabIndex={d === 0 ? 0 : -1}
              >
                <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
                <span className="coverflow__caption">{photo.caption}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="container coverflow__controls">
        <button type="button" className="round-btn" onClick={() => go(-1)} aria-label="Previous photo">
          <span aria-hidden="true">←</span>
        </button>
        <div className="coverflow__count" aria-live="polite">
          <strong>{String(index + 1).padStart(2, "0")}</strong>
          <span>/ {String(total).padStart(2, "0")}</span>
          <em>{GALLERY[index].caption}</em>
        </div>
        <button type="button" className="round-btn" onClick={() => go(1)} aria-label="Next photo">
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}
