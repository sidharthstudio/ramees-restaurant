import { BRAND, asset } from "../data/restaurant";

const CATERING_MESSAGE = encodeURIComponent(
  "Hello Ramees Restaurant! I'd like a catering quote.\n\nOccasion: \nDate: \nNumber of guests: \nDelivery / venue: \n",
);

export default function Catering() {
  return (
    <section className="catering" id="catering">
      <img
        className="catering__bg"
        src={asset("img/rotisserie.webp")}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />
      <div className="catering__scrim" aria-hidden="true" />

      <div className="container catering__inner">
        <div className="catering__copy">
          <p className="eyebrow">Catering & celebrations</p>
          <h2 data-reveal>
            Feeding fifty,
            <br />
            or <em>five hundred.</em>
          </h2>
          <p data-reveal>
            Ramees Caterers has been carrying the kitchen out of the restaurant for years — wedding
            sadhyas and nikah dinners, iftar tables through Ramadan, corporate lunches and house
            warmings across Kollam and Kottiyam.
          </p>

          <ul className="catering__list" data-reveal>
            <li>Weddings & nikah receptions</li>
            <li>Iftar & Ramadan packages</li>
            <li>Corporate & school functions</li>
            <li>Bulk biriyani & grill platters</li>
          </ul>

          <div className="catering__actions">
            <a
              className="btn btn--solid"
              href={`https://wa.me/${BRAND.whatsapp}?text=${CATERING_MESSAGE}`}
              target="_blank"
              rel="noreferrer"
            >
              Get a catering quote
            </a>
            <a className="btn btn--ghost" href="tel:+917559066666">
              Call +91 75590 66666
            </a>
          </div>
        </div>

        <aside className="catering__card" data-reveal>
          <p className="eyebrow">Private dining</p>
          <h3>Take the room</h3>
          <p>
            Family birthdays, post-nikah lunches and small company dinners — reserve a section of the
            hall at Chinnakada or the Kottiyam dining room, with a set menu built with our chef.
          </p>
          <dl>
            <div>
              <dt>Lead time</dt>
              <dd>48 hours for 20+ guests</dd>
            </div>
            <div>
              <dt>Menus</dt>
              <dd>Malabar, Arabian or mixed</dd>
            </div>
            <div>
              <dt>Service</dt>
              <dd>Dine-in, takeaway or venue delivery</dd>
            </div>
          </dl>
          <a className="link-arrow" href="#reserve">
            Enquire at your branch <span aria-hidden="true">→</span>
          </a>
        </aside>
      </div>
    </section>
  );
}
