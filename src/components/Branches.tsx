import { BRANCHES } from "../data/restaurant";
import type { Branch } from "../data/restaurant";
import { useOpenStatus } from "../lib/hooks";

const telHref = (number: string) => `tel:${number.replace(/[^+\d]/g, "")}`;

function BranchCard({ branch }: { branch: Branch }) {
  const status = useOpenStatus(branch);

  return (
    <article className="branch" data-reveal>
      <header className="branch__head">
        <div>
          <p className="branch__city">{branch.city}</p>
          <h3>{branch.area}</h3>
        </div>
        <span className={`status ${status.isOpen ? "status--open" : "status--closed"}`}>
          <span className="status__dot" aria-hidden="true" />
          {status.label}
        </span>
      </header>

      <address className="branch__address">{branch.address}</address>

      <dl className="branch__meta">
        <div>
          <dt>Hours</dt>
          <dd>{branch.hoursLabel}</dd>
        </div>
        <div>
          <dt>Phone</dt>
          <dd>
            {branch.phones.map((phone) => (
              <a key={phone.number} href={telHref(phone.number)}>
                {phone.number}
              </a>
            ))}
          </dd>
        </div>
      </dl>

      <ul className="branch__facilities">
        {branch.facilities.map((facility) => (
          <li key={facility}>{facility}</li>
        ))}
      </ul>

      <div className="branch__actions">
        <a
          className="btn btn--ghost btn--sm"
          href={branch.mapUrl}
          target="_blank"
          rel="noreferrer"
        >
          Directions <span aria-hidden="true">↗</span>
        </a>
        <a className="btn btn--solid btn--sm" href="#reserve">
          Book here
        </a>
      </div>

      <p className="branch__licence">FSSAI lic. {branch.fssai}</p>
    </article>
  );
}

export default function Branches() {
  return (
    <section className="section branches" id="locations">
      <div className="container">
        <div className="section__head">
          <div>
            <p className="eyebrow">Three kitchens</p>
            <h2 data-reveal>
              Find us in
              <br />
              <em>Kerala.</em>
            </h2>
          </div>
          <p className="section__lead" data-reveal>
            The original hall on Residency Road, the highway dining room at Kottiyam with parking,
            and the Kochi branch at Kundanoor. Same menu, same fire, three different evenings out.
          </p>
        </div>

        <div className="branch-grid">
          {BRANCHES.map((branch) => (
            <BranchCard key={branch.id} branch={branch} />
          ))}
        </div>
      </div>
    </section>
  );
}
