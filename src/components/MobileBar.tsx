import { BRAND } from "../data/restaurant";

export default function MobileBar() {
  return (
    <div className="mobile-bar">
      <a href="tel:+917559066666" className="mobile-bar__item">
        <span aria-hidden="true">✆</span> Call
      </a>
      <a href="#reserve" className="mobile-bar__item mobile-bar__item--primary">
        Reserve
      </a>
      <a href={BRAND.swiggy} target="_blank" rel="noreferrer" className="mobile-bar__item">
        <span aria-hidden="true">↗</span> Order
      </a>
    </div>
  );
}
