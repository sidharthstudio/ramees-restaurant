import { useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { BRANCHES, BRAND } from "../data/restaurant";

type Fields = {
  name: string;
  phone: string;
  branch: string;
  date: string;
  time: string;
  guests: string;
  notes: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const TIMES = Array.from({ length: 22 }, (_, i) => {
  const total = 12 * 60 + i * 30;
  const hour = Math.floor(total / 60);
  const minute = total % 60;
  const hour12 = hour > 12 ? hour - 12 : hour;
  return `${hour12}:${String(minute).padStart(2, "0")} ${hour >= 12 ? "pm" : "am"}`;
});

function isoDate(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

export default function Reserve() {
  const today = useMemo(() => isoDate(0), []);
  const lastDay = useMemo(() => isoDate(60), []);

  const [fields, setFields] = useState<Fields>({
    name: "",
    phone: "",
    branch: BRANCHES[0].id,
    date: today,
    time: "8:00 pm",
    guests: "2",
    notes: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const branch = BRANCHES.find((b) => b.id === fields.branch) ?? BRANCHES[0];

  const update = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const next: Errors = {};
    if (fields.name.trim().length < 2) next.name = "Please tell us the name for the table.";
    const digits = fields.phone.replace(/\D/g, "");
    if (digits.length < 10) next.phone = "A phone number with at least 10 digits, please.";
    if (!fields.date) next.date = "Choose a date.";
    if (!fields.time) next.time = "Choose a time.";
    return next;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const first = Object.keys(next)[0];
      document.getElementById(`res-${first}`)?.focus();
      return;
    }

    const message = [
      "Hello Ramees Restaurant! I'd like to book a table.",
      "",
      `Name: ${fields.name.trim()}`,
      `Phone: ${fields.phone.trim()}`,
      `Branch: ${branch.area}, ${branch.city}`,
      `Date: ${fields.date}`,
      `Time: ${fields.time}`,
      `Guests: ${fields.guests}`,
      fields.notes.trim() ? `Notes: ${fields.notes.trim()}` : "",
      "",
      "Please confirm. Thank you!",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
    setSent(true);
  };

  return (
    <section className="section reserve" id="reserve">
      <div className="container reserve__grid">
        <div className="reserve__intro">
          <p className="eyebrow">Reservations</p>
          <h2 data-reveal>
            Save the
            <br />
            <em>table.</em>
          </h2>
          <p data-reveal>
            Send us the details and we will open WhatsApp with your request ready to send. Our team
            confirms every booking by call — usually within the hour the restaurant is open.
          </p>

          <div className="reserve__contact" data-reveal>
            <a href="tel:+917559066666" className="reserve__phone">
              <span>Chinnakada</span> +91 75590 66666
            </a>
            <a href="tel:+919061095555" className="reserve__phone">
              <span>Kottiyam</span> +91 90610 95555
            </a>
            <a href="tel:+919020222301" className="reserve__phone">
              <span>Kochi</span> +91 90202 22301
            </a>
          </div>

          <p className="reserve__small">
            Walk-ins are always welcome. For parties of 12 or more, or for a private section of the
            hall, call the branch directly.
          </p>
        </div>

        <div className="reserve__panel" data-reveal>
          {sent ? (
            <div className="reserve__sent" role="status">
              <span className="reserve__sent-mark" aria-hidden="true">
                ✓
              </span>
              <h3>Your request is ready in WhatsApp</h3>
              <p>
                Send the message and we will confirm your table at {branch.area}. If the chat did not
                open, call us on{" "}
                <a href={`tel:${branch.phones[0].number.replace(/[^+\d]/g, "")}`}>
                  {branch.phones[0].number}
                </a>
                .
              </p>
              <div className="reserve__sent-actions">
                <button type="button" className="btn btn--ghost btn--sm" onClick={() => setSent(false)}>
                  Edit the booking
                </button>
                <a
                  className="btn btn--solid btn--sm"
                  href={`https://wa.me/${BRAND.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <form className="reserve__form" onSubmit={handleSubmit} noValidate>
              <div className="field">
                <label htmlFor="res-name">Name</label>
                <input
                  id="res-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  value={fields.name}
                  onChange={update}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "err-name" : undefined}
                />
                {errors.name ? (
                  <p className="field__error" id="err-name" role="alert">
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div className="field">
                <label htmlFor="res-phone">Phone</label>
                <input
                  id="res-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+91 ..."
                  value={fields.phone}
                  onChange={update}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "err-phone" : undefined}
                />
                {errors.phone ? (
                  <p className="field__error" id="err-phone" role="alert">
                    {errors.phone}
                  </p>
                ) : null}
              </div>

              <div className="field field--wide">
                <label htmlFor="res-branch">Branch</label>
                <select id="res-branch" name="branch" value={fields.branch} onChange={update}>
                  {BRANCHES.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.area}, {b.city}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="res-date">Date</label>
                <input
                  id="res-date"
                  name="date"
                  type="date"
                  min={today}
                  max={lastDay}
                  value={fields.date}
                  onChange={update}
                  aria-invalid={Boolean(errors.date)}
                />
                {errors.date ? (
                  <p className="field__error" role="alert">
                    {errors.date}
                  </p>
                ) : null}
              </div>

              <div className="field">
                <label htmlFor="res-time">Time</label>
                <select id="res-time" name="time" value={fields.time} onChange={update}>
                  {TIMES.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field field--wide">
                <label htmlFor="res-guests">Guests</label>
                <select id="res-guests" name="guests" value={fields.guests} onChange={update}>
                  {Array.from({ length: 12 }, (_, i) => String(i + 1)).map((n) => (
                    <option key={n} value={n}>
                      {n} {n === "1" ? "guest" : "guests"}
                    </option>
                  ))}
                  <option value="12+">More than 12 (we will call)</option>
                </select>
              </div>

              <div className="field field--wide">
                <label htmlFor="res-notes">Anything we should know?</label>
                <textarea
                  id="res-notes"
                  name="notes"
                  rows={3}
                  placeholder="Birthday, high chair, quieter corner, allergies…"
                  value={fields.notes}
                  onChange={update}
                />
              </div>

              <button type="submit" className="btn btn--solid reserve__submit">
                Request the table
              </button>
              <p className="reserve__disclaimer">
                Opens WhatsApp with your details. Nothing is booked until we reply.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
