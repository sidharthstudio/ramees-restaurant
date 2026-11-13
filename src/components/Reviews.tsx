import { RATING, REVIEWS } from "../data/restaurant";

export default function Reviews() {
  return (
    <section className="section reviews" aria-label="Guest reviews">
      <div className="container reviews__grid">
        <div className="reviews__score" data-reveal>
          <p className="eyebrow">What the room says</p>
          <div className="reviews__number">
            <span>{RATING.score}</span>
            <div>
              <span className="reviews__stars" aria-hidden="true">
                ★★★★☆
              </span>
              <p>
                {RATING.count} {RATING.platform}
              </p>
            </div>
          </div>
          <p className="reviews__aside">
            4.4 on Swiggy from 20,000+ ratings · 4.9 for dining at Chinnakada on Zomato.
          </p>
        </div>

        <ul className="reviews__list">
          {REVIEWS.map((review) => (
            <li key={review.author} className="review" data-reveal>
              <span className="review__quote" aria-hidden="true">
                “
              </span>
              <blockquote>{review.quote}</blockquote>
              <footer>
                <span className="review__author">{review.author}</span>
                <span className="review__source">{review.source}</span>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
