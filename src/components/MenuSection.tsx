import { useMemo, useState } from "react";
import { BRAND, MENU } from "../data/restaurant";
import { rupee } from "../lib/hooks";

export default function MenuSection() {
  const [active, setActive] = useState(MENU[0].id);
  const category = useMemo(() => MENU.find((c) => c.id === active) ?? MENU[0], [active]);

  return (
    <section className="section menu-section" id="menu">
      <div className="container menu">
        <div className="menu__aside">
          <p className="eyebrow">The kitchen list</p>
          <h2 data-reveal>
            Order like
            <br />
            a <em>local.</em>
          </h2>
          <p className="menu__note" data-reveal>
            Prices come from our latest online listings and vary slightly between branches. Biriyani
            and charcoal grills are cooked in batches — call ahead for large tables.
          </p>

          <div className="menu__tabs" role="group" aria-label="Menu categories">
            {MENU.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`chip ${active === item.id ? "chip--active" : ""}`}
                aria-pressed={active === item.id}
                onClick={() => setActive(item.id)}
              >
                {item.title}
              </button>
            ))}
          </div>

          <div className="menu__links">
            <a className="btn btn--ghost btn--sm" href={BRAND.zomato} target="_blank" rel="noreferrer">
              Order on Zomato <span aria-hidden="true">↗</span>
            </a>
            <a className="btn btn--ghost btn--sm" href={BRAND.swiggy} target="_blank" rel="noreferrer">
              Order on Swiggy <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="menu__panel">
          <div className="menu__panel-head">
            <h3>{category.title}</h3>
            <p>{category.blurb}</p>
          </div>

          <ul className="menu__list" key={category.id}>
            {category.items.map((item, i) => (
              <li key={item.name} className="menu__item" style={{ animationDelay: `${i * 26}ms` }}>
                <div className="menu__item-main">
                  <span className="menu__name">
                    {item.name}
                    {item.tag ? <em className="menu__tag">{item.tag}</em> : null}
                  </span>
                  {item.description ? <span className="menu__desc">{item.description}</span> : null}
                </div>
                <span className="menu__dots" aria-hidden="true" />
                <span className="menu__price">
                  {item.price !== undefined ? rupee(item.price) : <span className="menu__price-alt">ask</span>}
                </span>
              </li>
            ))}
          </ul>

          <p className="menu__foot">
            Vegetarian dishes are cooked separately. All meat is halal-certified. Prices in INR,
            inclusive of taxes at most branches.
          </p>
        </div>
      </div>
    </section>
  );
}
