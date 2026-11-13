import type { PointerEvent } from "react";
import { SIGNATURES } from "../data/restaurant";
import { rupee } from "../lib/hooks";

function TiltCard({ dish, index }: { dish: (typeof SIGNATURES)[number]; index: number }) {
  const handleMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--rx", `${(-py * 7).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(px * 9).toFixed(2)}deg`);
    el.style.setProperty("--mx", `${((px + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${((py + 0.5) * 100).toFixed(1)}%`);
  };

  const handleLeave = (event: PointerEvent<HTMLElement>) => {
    const el = event.currentTarget;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <article
      className="dish"
      data-reveal
      style={{ transitionDelay: `${(index % 3) * 90}ms` }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      <div className="dish__media">
        <img src={dish.image} alt={dish.alt} loading="lazy" decoding="async" width={900} height={1100} />
        <span className="dish__shine" aria-hidden="true" />
        <span className="dish__index" aria-hidden="true">
          0{index + 1}
        </span>
        {dish.price !== undefined ? (
          <span className="dish__price">{rupee(dish.price)}</span>
        ) : (
          <span className="dish__meta-chip">{dish.meta}</span>
        )}
      </div>
      <div className="dish__body">
        <h3>{dish.name}</h3>
        <p>{dish.description}</p>
        <ul className="dish__tags">
          {dish.tags?.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        {dish.price !== undefined && dish.meta ? <span className="dish__note">{dish.meta}</span> : null}
      </div>
    </article>
  );
}

export default function Signature() {
  return (
    <section className="section signature" id="signature">
      <div className="container">
        <div className="section__head">
          <div>
            <p className="eyebrow">The house signatures</p>
            <h2 data-reveal>
              The plates
              <br />
              people <em>come back for.</em>
            </h2>
          </div>
          <p className="section__lead" data-reveal>
            Six dishes that show up on almost every table. Ask for them by name — the kitchen has
            been cooking them long enough to know exactly how you like them.
          </p>
        </div>

        <div className="dish-grid">
          {SIGNATURES.map((dish, index) => (
            <TiltCard key={dish.name} dish={dish} index={index} />
          ))}
        </div>

        <div className="signature__foot" data-reveal>
          <p>
            Looking for the rest? The full kitchen list runs to nine pages — biriyani, tandoor,
            wok, and the sweets counter.
          </p>
          <a className="link-arrow" href="#menu">
            See the full menu <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
