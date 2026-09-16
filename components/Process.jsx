import { processSteps } from "@/lib/data";
import { CartIcon, ListIcon, PinIcon } from "./Icons";
import Reveal from "./Reveal";
import SplitTitle from "./SplitTitle";

const icons = [ListIcon, CartIcon, PinIcon];

export default function Process() {
  return (
    <section className="rest-section" data-inview>
      <div className="page-wrap">
        <Reveal variant="stagger" className="rest-head">
          <div>
            <p className="standard-kicker">
              <span className="standard-kicker-line" aria-hidden="true" />
              How it works
            </p>
            <SplitTitle className="display rest-title">
              A supply process <span>without the fog.</span>
            </SplitTitle>
          </div>
          <p className="copy rest-lead">
            Order from a clear catalogue, receive tracked delivery, and access documentation through
            the right channels.
          </p>
        </Reveal>

        <div className="process-grid">
          {processSteps.map((step, index) => {
            const Icon = icons[index];
            return (
              <Reveal key={step.id} delay={0.14 + index * 0.14} variant="scale" className="process-item">
                <span className="process-icon">
                  <Icon />
                </span>
                <p className="process-index">{step.id}</p>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
