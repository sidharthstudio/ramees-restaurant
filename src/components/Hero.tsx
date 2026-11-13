import { Component, Suspense, lazy } from "react";
import type { ReactNode } from "react";
import { BRAND, RATING } from "../data/restaurant";

// The 3D scene pulls in three.js, so it loads after the hero text paints.
const PlateScene = lazy(() => import("../three/PlateScene"));

/** If the scene fails for any reason, keep the hero copy and drop the canvas. */
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function Hero() {
  return (
    <section className="hero" id="top">
      <SceneBoundary>
        <Suspense fallback={null}>
          <PlateScene className="hero__scene" />
        </Suspense>
      </SceneBoundary>
      <div className="hero__veil" aria-hidden="true" />
      <div className="hero__grain" aria-hidden="true" />

      <div className="container hero__inner">
        <p className="eyebrow hero__eyebrow">
          <span className="dot" aria-hidden="true" /> {BRAND.establishedLine}
        </p>

        <h1 className="hero__title">
          One thousand flavours.
          <br />
          <em>One place.</em>
        </h1>

        <p className="hero__lead">
          Malabar biriyani sealed on the dum, Arabian chicken off the charcoal, and Indo-Chinese wok
          classics — cooked to order in Kollam since the family kitchen opened its doors.
        </p>

        <div className="hero__actions">
          <a className="btn btn--solid" href="#reserve">
            Reserve a table
          </a>
          <a className="btn btn--ghost" href={BRAND.swiggy} target="_blank" rel="noreferrer">
            Order online <span aria-hidden="true">↗</span>
          </a>
        </div>

        <dl className="hero__stats">
          <div>
            <dt>Google rating</dt>
            <dd>
              {RATING.score} <span className="star" aria-hidden="true">★</span>
              <small>{RATING.count} reviews</small>
            </dd>
          </div>
          <div>
            <dt>Kitchen</dt>
            <dd>
              100% halal
              <small>Arabian · Malabar · Chinese</small>
            </dd>
          </div>
          <div>
            <dt>Branches</dt>
            <dd>
              Three
              <small>Kollam · Kottiyam · Kochi</small>
            </dd>
          </div>
        </dl>
      </div>

      <a className="hero__scroll" href="#signature" aria-label="Scroll to signature dishes">
        <span className="hero__scroll-line" aria-hidden="true" />
        <span className="hero__scroll-text">The menu</span>
      </a>
    </section>
  );
}
