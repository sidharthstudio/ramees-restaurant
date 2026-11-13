import Branches from "./components/Branches";
import Catering from "./components/Catering";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Hero from "./components/Hero";
import MenuSection from "./components/MenuSection";
import MobileBar from "./components/MobileBar";
import Nav from "./components/Nav";
import Reserve from "./components/Reserve";
import Reviews from "./components/Reviews";
import Signature from "./components/Signature";
import { useRevealOnScroll } from "./lib/hooks";

export default function App() {
  useRevealOnScroll();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <div className="marquee" aria-hidden="true">
          <div className="marquee__track">
            {[0, 1].map((copy) => (
              <span key={copy} className="marquee__group">
                {[
                  "Mutton Rameesa",
                  "Charcoal Alfaham",
                  "Dum Biriyani",
                  "Porotta & Beef",
                  "Chilly Chicken",
                  "Falooda",
                  "Kuboos & Toum",
                  "Mocktails",
                ].map((word) => (
                  <span key={word} className="marquee__item">
                    {word} <em aria-hidden="true">✦</em>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
        <Signature />
        <MenuSection />
        <Gallery />
        <Branches />
        <Catering />
        <Reviews />
        <Reserve />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
