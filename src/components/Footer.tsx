import { BRANCHES, BRAND } from "../data/restaurant";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <span className="logo__mark logo__mark--lg" aria-hidden="true">
              R
            </span>
            <p>
              Ramees Restaurant
              <em>One thousand flavours. One place.</em>
            </p>
          </div>

          <nav className="footer__col" aria-label="Branches">
            <h3>Branches</h3>
            {BRANCHES.map((branch) => (
              <a key={branch.id} href={branch.mapUrl} target="_blank" rel="noreferrer">
                {branch.area}, {branch.city}
              </a>
            ))}
          </nav>

          <div className="footer__col">
            <h3>Order & book</h3>
            <a href={BRAND.swiggy} target="_blank" rel="noreferrer">
              Swiggy
            </a>
            <a href={BRAND.zomato} target="_blank" rel="noreferrer">
              Zomato
            </a>
            <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <a href="#reserve">Reservations</a>
          </div>

          <div className="footer__col">
            <h3>Contact</h3>
            <a href="tel:+917559066666">+91 75590 66666</a>
            <a href="mailto:info.rameesrestaurant@gmail.com">{BRAND.email}</a>
            <a href={BRAND.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <span className="footer__muted">Open daily · 11:30 am onwards</span>
          </div>
        </div>

        <div className="footer__wordmark" aria-hidden="true">
          Ramees
        </div>

        <div className="footer__legal">
          <p>© {new Date().getFullYear()} Ramees Restaurant. All rights reserved.</p>
          <p>
            FSSAI licences: {BRANCHES.map((b) => b.fssai).join(" · ")} — prices, hours and dishes may
            change by branch.
          </p>
          <p className="footer__credit">
            Food photography: CC0 contributors via Openverse. This site is an independent presentation
            of the restaurant.
          </p>
          <a className="footer__top-link" href="#top">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
