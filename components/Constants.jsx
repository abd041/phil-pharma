import { constants } from "@/lib/data";
import Reveal from "./Reveal";
import SplitTitle from "./SplitTitle";

export default function Constants() {
  return (
    <section className="rest-section" data-inview>
      <div className="page-wrap">
        <Reveal variant="stagger" className="rest-head">
          <div>
            <p className="standard-kicker">
              <span className="standard-kicker-line" aria-hidden="true" />
              Our commitment
            </p>
            <SplitTitle className="display rest-title">
              Four constants in <span>every order.</span>
            </SplitTitle>
          </div>
          <p className="copy rest-lead">
            The same four principles guide every vial, every dispatch note, and every documentation
            request.
          </p>
        </Reveal>

        <div className="constants-grid">
          {constants.map((item, index) => (
            <Reveal key={item.id} delay={0.12 + index * 0.12} variant="scale" className="constant-item">
              <p>{item.id}</p>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
