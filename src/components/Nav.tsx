import { useEffect, useState } from "react";
import { BRAND } from "../data/restaurant";

const LINKS = [
  { href: "#signature", label: "Signatures" },
  { href: "#menu", label: "Menu" },
  { href: "#gallery", label: "Gallery" },
  { href: "#locations", label: "Locations" },
  { href: "#catering", label: "Catering" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-locked", open);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("nav-locked");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""} ${open ? "nav--open" : ""}`}>
      <div className="container nav__bar">
        <a className="logo" href="#top" aria-label="Ramees Restaurant, back to top" onClick={() => setOpen(false)}>
          <span className="logo__mark" aria-hidden="true">
            R
          </span>
          <span className="logo__text">
            <strong>Ramees</strong>
            <em>Restaurant</em>
          </span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <a className="nav__phone" href="tel:+917559066666">
            <span aria-hidden="true">✆</span> +91 75590 66666
          </a>
          <a className="btn btn--solid btn--sm" href="#reserve" onClick={() => setOpen(false)}>
            Reserve
          </a>
          <button
            className="nav__toggle"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className="nav__sheet" id="mobile-nav" hidden={!open}>
        <nav aria-label="Mobile">
          {LINKS.map((link, i) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              <span className="nav__sheet-index">0{i + 1}</span>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="nav__sheet-foot">
          <a className="btn btn--solid" href="#reserve" onClick={() => setOpen(false)}>
            Reserve a table
          </a>
          <a className="btn btn--ghost" href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noreferrer">
            WhatsApp us
          </a>
        </div>
      </div>
    </header>
  );
}
